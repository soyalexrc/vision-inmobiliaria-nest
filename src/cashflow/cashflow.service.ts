import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CashFlow } from './entities/cashflow.entity';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Property } from '../property/entities/property.entity';
import { CreateTemporalTransactionDto } from './dto/create-temporal-transaction.dto';
import groupBy from '../common/helpers/groupby.helper';

@Injectable()
export class CashflowService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(CashFlow) private cashFlowModel: typeof CashFlow,
    @InjectModel(Property) private propertyModel: typeof Property,
    @InjectConnection() private sequelize: Sequelize,
  ) {}

  async create(createCashflowDto: CreateCashflowDto, res: Response) {
    try {
      const data = await this.cashFlowModel.create(createCashflowDto as any);
      res.status(HttpStatus.OK).send({
        message: 'Se creo el registro con exito!',
        data,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async createTemporalTransaction(createTemporalTransactionDto: CreateTemporalTransactionDto, res: Response) {
    const transactionId = uuid();
    try {
      const dataFrom = await this.cashFlowModel.create({
        ...createTemporalTransactionDto,
        client: null,
        property: null,
        location: '',
        canon: '',
        contract: '',
        guarantee: '',
        service: '',
        typeOfService: '',
        taxPayer: '',
        totalDue: '',
        pendingToCollect: '',
        observation: '',
        transactionType: 'Egreso',
        isTemporalTransaction: true,
        temporalTransactionId: transactionId,
        entity: createTemporalTransactionDto.entityFrom,
        propertyJson: {},
      });

      const dataTo = await this.cashFlowModel.create({
        ...createTemporalTransactionDto,
        client: null,
        property: null,
        location: '',
        canon: '',
        contract: '',
        guarantee: '',
        service: '',
        typeOfService: '',
        taxPayer: '',
        totalDue: '',
        pendingToCollect: '',
        observation: '',
        transactionType: 'Ingreso',
        isTemporalTransaction: true,
        temporalTransactionId: transactionId,
        entity: createTemporalTransactionDto.entityTo,
        propertyJson: {},
      });

      res.status(HttpStatus.OK).send({
        message: 'Se registro la transaccion con exito!',
        dataFrom,
        dataTo,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findAll(paginationData: PaginationDataDto, res: Response) {
    const { pageIndex, pageSize } = paginationData;
    try {
      const data = await this.cashFlowModel.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
      });
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async getTemporalTransactions(paginationData: PaginationDataDto, res: Response) {
    const { pageIndex, pageSize } = paginationData;
    try {
      const data = await this.cashFlowModel.findAndCountAll({
        where: { isTemporalTransaction: true },
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
      });
      const dataGrouped = Array.from(groupBy(data.rows, (transaction: CashFlow) => transaction.temporalTransactionId)).map(
        (element: [string, [CashFlow, CashFlow]]) => ({
          id: element[0],
          date: element[1][0].createdAt,
          amount: `${element[1][0].currency} ${element[1][0].amount}`,
          origin: element[1][0].entity,
          destiny: element[1][1].entity,
          createdBy: element[1][0].createdBy,
          createdAt: element[1][0].createdAt,
        }),
      );
      res.status(HttpStatus.OK).send({
        count: data.count,
        rows: dataGrouped,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async getTotals(res: Response) {
    try {
      const ingreso = await this.cashFlowModel.sequelize.query(
        `
            select (select sum(cast(amount as decimal)) as BS
                    from "CashFlow"
                    where "transactionType" = 'Ingreso'
                      and currency = 'Bs'
                      and "isTemporalTransaction" = false),
                   (select sum(cast(amount as decimal)) as USD
                    from "CashFlow"
                    where "transactionType" = 'Ingreso'
                      and currency = '$'
                      and "isTemporalTransaction" = false),
                   (select sum(cast(amount as decimal)) as EUR
                    from "CashFlow"
                    where "transactionType" = 'Ingreso'
                      and currency = '€'
                      and "isTemporalTransaction" = false);
        `,
        { type: sequelize.QueryTypes.SELECT },
      );
      const egreso = await this.cashFlowModel.sequelize.query(
        `select (select sum(cast(amount as decimal)) as BS
                 from "CashFlow"
                 where "transactionType" = 'Egreso'
                   and currency = 'Bs'
                   and "isTemporalTransaction" = false),
                (select sum(cast(amount as decimal)) as USD
                 from "CashFlow"
                 where "transactionType" = 'Egreso'
                   and currency = '$'
                   and "isTemporalTransaction" = false),
                (select sum(cast(amount as decimal)) as EUR
                 from "CashFlow"
                 where "transactionType" = 'Egreso'
                   and currency = '€'
                   and "isTemporalTransaction" = false);`,
        { type: sequelize.QueryTypes.SELECT },
      );

      const cuentasPorCobrar = await this.cashFlowModel.sequelize.query(
        `select (select sum(cast("pendingToCollect" as decimal)) as BS
                 from "CashFlow"
                 where ("transactionType" = 'Cuenta por cobrar' or "transactionType" = 'Ingreso')
                   and currency = 'Bs'
                   and "isTemporalTransaction" = false),
                (select sum(cast("pendingToCollect" as decimal)) as USD
                 from "CashFlow"
                 where ("transactionType" = 'Cuenta por cobrar' or "transactionType" = 'Ingreso')
                   and currency = '$'
                   and "isTemporalTransaction" = false),
                (select sum(cast("pendingToCollect" as decimal)) as EUR
                 from "CashFlow"
                 where ("transactionType" = 'Cuenta por cobrar' or "transactionType" = 'Ingreso')
                   and currency = '€'
                   and "isTemporalTransaction" = false);`,
        { type: sequelize.QueryTypes.SELECT },
      );

      const cuentasPorPagar = await this.cashFlowModel.sequelize.query(
        `select (select sum(cast("totalDue" as decimal)) as BS
                 from "CashFlow"
                 where ("transactionType" = 'Cuenta por pagar' or "transactionType" = 'Ingreso')
                   and currency = 'Bs'
                   and "isTemporalTransaction" = false),
                (select sum(cast("totalDue" as decimal)) as USD
                 from "CashFlow"
                 where ("transactionType" = 'Cuenta por pagar' or "transactionType" = 'Ingreso')
                   and currency = '$'
                   and "isTemporalTransaction" = false),
                (select sum(cast("totalDue" as decimal)) as EUR
                 from "CashFlow"
                 where ("transactionType" = 'Cuenta por pagar' or "transactionType" = 'Ingreso')
                   and currency = '€'
                   and "isTemporalTransaction" = false);`,
        { type: sequelize.QueryTypes.SELECT },
      );
      res.status(HttpStatus.OK).send({
        ingreso: ingreso[0],
        egreso: egreso[0],
        cuentasPorPagar: cuentasPorPagar[0],
        cuentasPorCobrar: cuentasPorCobrar[0],
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findOne(id: number, res: Response) {
    try {
      const data = await this.cashFlowModel.findOne({ where: { id: id } });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se encontro el registro con el id ' + id,
          error: true,
        });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async update(id: number, updateCashflowDto: UpdateCashflowDto, res: Response) {
    try {
      const userToUpdate = await this.cashFlowModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se encontro el registro con el id ' + id,
          error: true,
        });
      const data = await userToUpdate.update(updateCashflowDto);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se edito el registro con exito!',
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.cashFlowModel.destroy({ where: { id: id } });
      if (data === 0)
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se logro eliminar el registro con el id ' + id,
          error: true,
        });
      if (data !== 0)
        res.status(HttpStatus.OK).send({
          message: 'Se elimino el registro con exito!',
        });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }
}
