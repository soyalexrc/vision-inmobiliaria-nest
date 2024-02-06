import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CashFlow } from './entities/cashflow.entity';
import { Sequelize } from 'sequelize-typescript';
import sequelize, { Op, literal, col, cast } from 'sequelize';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Property } from '../property/entities/property.entity';
import { CreateTemporalTransactionDto } from './dto/create-temporal-transaction.dto';
import groupBy from '../common/helpers/groupby.helper';
import { Client } from '../client/entities/client.entity';
import { Owner } from '../owner/entities/owner.entity';
import { CashflowPerson } from './entities/cashflowPerson.entity';
import { NegotiationInformation } from '../property/entities/negotiationInformation.entity';
import { GeneralInformation } from '../property/entities/generalInformation.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FiltersDto } from './dto/filters.dto';
import { filtersCleaner } from '../common/helpers/filtersCleaner';
import { calculateSumByTransactionTypeAndCurrency } from '../common/helpers/sql/totals-helpers';
import { User } from '../user/entities/user.entity';
import * as NodeMailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { CloseCashFlow } from './entities/closeCashflow.entity';
import { CashflowProperty } from "./entities/cashflowProperty.entity";

const entities = [
  { key: 'totalBnc', value: 'Banco Nacional de Crédito (BNC)' },
  { key: 'totalBanPan', value: 'Banesco Panamá' },
  { key: 'totalBanVen', value: 'Banesco Venezuela' },
  { key: 'totalBanNacTer', value: 'Banco Nacional de Terceros' },
  { key: 'totalOfiPaseo', value: 'Oficina Paseo La Granja' },
  { key: 'totalTesoreria', value: 'Tesorería' },
  { key: 'totalOfiSanCar', value: 'Oficina San Carlos' },
  { key: 'totalBanInTer', value: 'Banco internacional de terceros' },
];

@Injectable()
export class CashflowService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(CashFlow) private cashFlowModel: typeof CashFlow,
    @InjectModel(Property) private propertyModel: typeof Property,
    @InjectModel(Client) private clientModel: typeof Client,
    @InjectModel(Owner) private ownerModel: typeof Owner,
    @InjectModel(CloseCashFlow) private closeCashFlowModel: typeof CloseCashFlow,
    @InjectModel(CashflowPerson) private cashFlowPersonModel: typeof CashflowPerson,
    @InjectModel(CashflowProperty) private cashFlowPropertyModel: typeof CashflowProperty,
    private configService: ConfigService,
  ) {}

  async create(createCashflowDto: CreateCashflowDto, res: Response) {
    try {
      console.log(createCashflowDto);
      const forLoop = async () => {
        const operations = [];

        for (let i = 0; i < createCashflowDto.payments.length; i++) {
          const result = await this.cashFlowModel.create({
            ...createCashflowDto,
            canon: createCashflowDto.payments[i].canon,
            contract: createCashflowDto.payments[i].contract,
            guarantee: createCashflowDto.payments[i].guarantee,
            serviceType: createCashflowDto.payments[i].serviceType,
            reason: createCashflowDto.payments[i].reason,
            service: createCashflowDto.payments[i].service,
            taxPayer: createCashflowDto.payments[i].taxPayer,
            amount: createCashflowDto.payments[i].amount,
            currency: createCashflowDto.payments[i].currency,
            wayToPay: createCashflowDto.payments[i].wayToPay,
            totalDue: createCashflowDto.payments[i].totalDue,
            observation: createCashflowDto.payments[i].observation,
            entity: createCashflowDto.payments[i].entity,
            attachments: createCashflowDto.payments[i].attachments,
            pendingToCollect: createCashflowDto.payments[i].pendingToCollect,
            transactionType: createCashflowDto.payments[i].transactionType,
          });

          operations.push(result);
        }

        return operations;
      };

      const data = await forLoop();
      res.status(HttpStatus.OK).send({
        message: 'Se creo el registro con exito!',
        data,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async createPerson(personData: { name: string }, res: Response) {
    try {
      const data = await this.cashFlowPersonModel.create(personData);
      res.status(HttpStatus.OK).send({
        message: 'Se creo el registro con exito!',
        data,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }
  async createProperty(propertyData: { name: string }, res: Response) {
    try {
      const data = await this.cashFlowPropertyModel.create(propertyData);
      res.status(HttpStatus.OK).send({
        message: 'Se creo el registro con exito!',
        data,
      });
    } catch (err) {
      this.logger.error(err);
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
        canon: false,
        contract: false,
        guarantee: false,
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
      });

      const dataTo = await this.cashFlowModel.create({
        ...createTemporalTransactionDto,
        client: null,
        property: null,
        location: '',
        canon: false,
        contract: false,
        guarantee: false,
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

  async findAll(filtersDto: FiltersDto, res: Response) {
    const {
      pageIndex,
      pageSize,
      property_id,
      person,
      owner_id,
      client_id,
      serviceType,
      transactionType,
      currency,
      wayToPay,
      entity,
      service,
      dateFrom,
      dateTo,
    } = filtersDto;
    const whereClause = filtersCleaner({
      transactionType,
      currency,
      wayToPay,
      entity,
      service,
      property_id,
      serviceType,
      person,
      client_id,
      owner_id,
    });
    if (dateFrom && dateTo) {
      whereClause.date = {
        [Op.between]: [dateFrom, dateTo],
      };
    }

    whereClause.isTemporalTransaction = false;
    this.logger.debug(whereClause);
    try {
      const data = await this.cashFlowModel.findAndCountAll({
        where: whereClause,
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['date', 'desc']],
        include: [CashflowProperty, Owner, Client, User],
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

  async getTotals(res: Response, filtersDto: FiltersDto) {
    const { dateFrom, dateTo } = filtersDto;
    try {
      const ingreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'amount', true, dateFrom, dateTo);
      const egreso = await calculateSumByTransactionTypeAndCurrency('Egreso', 'amount', true, dateFrom, dateTo);
      const ingresoCuentaTerceros = await calculateSumByTransactionTypeAndCurrency(
        'Ingreso a cuenta de terceros',
        'incomeByThird',
        true,
        dateFrom,
        dateTo,
      );

      const cuentasPorCobrarIngreso = await calculateSumByTransactionTypeAndCurrency(
        'Ingreso',
        'pendingToCollect',
        false,
        dateFrom,
        dateTo,
      );
      const cuentasPorCobrarPending = await calculateSumByTransactionTypeAndCurrency(
        'Cuenta por cobrar',
        'pendingToCollect',
        false,
        dateFrom,
        dateTo,
      );
      const cuentasPorCobrarTotal = {
        bs: cuentasPorCobrarIngreso.bs + cuentasPorCobrarPending.bs,
        usd: cuentasPorCobrarIngreso.usd + cuentasPorCobrarPending.usd,
        eur: cuentasPorCobrarIngreso.eur + cuentasPorCobrarPending.eur,
      };

      const cuentasPorPagarIngreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'totalDue', false, dateFrom, dateTo);
      const cuentasPorPagarPending = await calculateSumByTransactionTypeAndCurrency(
        'Cuenta por pagar',
        'totalDue',
        false,
        dateFrom,
        dateTo,
      );
      const cuentasPorPagarTotal = {
        bs: cuentasPorPagarIngreso.bs + cuentasPorPagarPending.bs,
        usd: cuentasPorPagarIngreso.usd + cuentasPorPagarPending.usd,
        eur: cuentasPorPagarIngreso.eur + cuentasPorPagarPending.eur,
      };

      res.status(HttpStatus.OK).send({
        ingreso,
        egreso,
        cuentasPorPagar: cuentasPorPagarTotal,
        cuentasPorCobrar: cuentasPorCobrarTotal,
        ingresoCuentaTerceros,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async getTotalAvailable(res: Response, filtersDto: FiltersDto) {
    const { dateFrom, dateTo } = filtersDto;
    try {
      const ingreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'amount', false, dateFrom, dateTo);
      const egreso = await calculateSumByTransactionTypeAndCurrency('Egreso', 'amount', false, dateFrom, dateTo);

      const total = {
        bs: ingreso.bs - egreso.bs,
        usd: ingreso.usd - egreso.usd,
        eur: ingreso.eur - egreso.eur,
      };

      res.status(HttpStatus.OK).send(total);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async getTotalAvailableByEntities(res: Response, filtersDto: FiltersDto) {
    const { dateFrom, dateTo } = filtersDto;
    try {
      const forLoop = async () => {
        const total = {};

        for (let i = 0; i < entities.length; i++) {
          const ingreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'amount', false, dateFrom, dateTo, entities[i].value);
          const egreso = await calculateSumByTransactionTypeAndCurrency('Egreso', 'amount', false, dateFrom, dateTo, entities[i].value);

          total[entities[i].key] = {
            bs: ingreso.bs - egreso.bs,
            usd: ingreso.usd - egreso.usd,
            eur: ingreso.eur - egreso.eur,
          };
        }

        return total;
      };
      const data = await forLoop();

      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findOne(id: number, res: Response) {
    try {
      const data = await this.cashFlowModel.findOne({ where: { id: id } });
      if (!data) {
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se encontro el registro con el id ' + id,
          error: true,
        });
      } else {
        res.status(HttpStatus.OK).send(data);
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findAllPeople(res: Response) {
    try {
      const clients = await this.clientModel.sequelize.query(
        `
        select "name", id, 'Cliente' as type from "Client"
      `,
        { type: sequelize.QueryTypes.SELECT },
      );

      const owners = await this.ownerModel.sequelize.query(
        `
        select concat("firstName", ' ', "lastName") as name, id, 'Propietario' as type from "Owner"
      `,
        { type: sequelize.QueryTypes.SELECT },
      );

      const cashFlowPeople = await this.cashFlowPersonModel.sequelize.query(
        `
            select id, name, 'Administracion interna' as type from "CashFlowPerson"
      `,
        { type: sequelize.QueryTypes.SELECT },
      );
      res.status(HttpStatus.OK).send([...cashFlowPeople, ...owners, ...clients]);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findAllProperties(res: Response) {
    try {
      const data = await this.cashFlowPropertyModel.findAll();
      res.status(HttpStatus.OK).send(data);
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

  // @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_10PM)
  // @Cron(CronExpression.EVERY_5_MINUTES)
  async generateCashFlowClose() {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(19, 0, 0, 0);

    const startDateTimeString = startDate.toISOString();
    const endDateTimeString = endDate.toISOString();

    this.logger.debug({
      startDateTimeString,
      endDateTimeString,
    });
    try {
      const data = [];

      for (let i = 0; i < 2; i++) {
        const dateFrom = i === 0 ? startDateTimeString : '';
        const dateTo = i === 0 ? endDateTimeString : '';

        const ingreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'amount', true, dateFrom, dateTo);
        const egreso = await calculateSumByTransactionTypeAndCurrency('Egreso', 'amount', true, dateFrom, dateTo);

        const total = {
          bs: ingreso.bs - egreso.bs,
          usd: ingreso.usd - egreso.usd,
          eur: ingreso.eur - egreso.eur,
        };

        const ingresoCuentaTerceros = await calculateSumByTransactionTypeAndCurrency(
          'Ingreso a cuenta de terceros',
          'incomeByThird',
          true,
          dateFrom,
          dateTo,
        );

        const cuentasPorCobrarIngreso = await calculateSumByTransactionTypeAndCurrency(
          'Ingreso',
          'pendingToCollect',
          false,
          dateFrom,
          dateTo,
        );
        const cuentasPorCobrarPending = await calculateSumByTransactionTypeAndCurrency(
          'Cuenta por cobrar',
          'pendingToCollect',
          false,
          dateFrom,
          dateTo,
        );
        const cuentasPorCobrarTotal = {
          bs: cuentasPorCobrarIngreso.bs + cuentasPorCobrarPending.bs,
          usd: cuentasPorCobrarIngreso.usd + cuentasPorCobrarPending.usd,
          eur: cuentasPorCobrarIngreso.eur + cuentasPorCobrarPending.eur,
        };

        const cuentasPorPagarIngreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'totalDue', false, dateFrom, dateTo);
        const cuentasPorPagarPending = await calculateSumByTransactionTypeAndCurrency(
          'Cuenta por pagar',
          'totalDue',
          false,
          dateFrom,
          dateTo,
        );
        const cuentasPorPagarTotal = {
          bs: cuentasPorPagarIngreso.bs + cuentasPorPagarPending.bs,
          usd: cuentasPorPagarIngreso.usd + cuentasPorPagarPending.usd,
          eur: cuentasPorPagarIngreso.eur + cuentasPorPagarPending.eur,
        };

        data.push({
          ingreso,
          egreso,
          totalDisponible: total,
          cuentasPorPagar: cuentasPorPagarTotal,
          cuentasPorCobrar: cuentasPorCobrarTotal,
          ingresoCuentaTerceros,
        });
      }

      const temporalTransactionsRaw = await this.cashFlowModel.findAll({
        where: {
          isTemporalTransaction: true,
          createdAt: {
            [Op.between]: [startDateTimeString, endDateTimeString],
          },
        },
      });

      this.logger.debug(temporalTransactionsRaw);

      const temporalTransactions = Array.from(
        groupBy(temporalTransactionsRaw, (transaction: CashFlow) => transaction.temporalTransactionId),
      ).map((element: [string, [CashFlow, CashFlow]]) => ({
        id: element[0],
        date: element[1][0].createdAt,
        amount: `${element[1][0].currency} ${element[1][0].amount}`,
        origin: element[1][0].entity,
        destiny: element[1][1].entity,
        createdBy: element[1][0].createdBy,
        createdAt: element[1][0].createdAt,
      }));

      const getTotalAvailableByEntitiesToday = async () => {
        const total = {};

        for (let i = 0; i < entities.length; i++) {
          const ingreso = await calculateSumByTransactionTypeAndCurrency(
            'Ingreso',
            'amount',
            false,
            startDateTimeString,
            endDateTimeString,
            entities[i].value,
          );
          const egreso = await calculateSumByTransactionTypeAndCurrency(
            'Egreso',
            'amount',
            false,
            startDateTimeString,
            endDateTimeString,
            entities[i].value,
          );

          total[entities[i].key] = {
            bs: ingreso.bs - egreso.bs,
            usd: ingreso.usd - egreso.usd,
            eur: ingreso.eur - egreso.eur,
          };
        }

        return total;
      };
      const totalAvailableByEntitiesToday = await getTotalAvailableByEntitiesToday();

      const getTotalAvailableByEntities = async () => {
        const total = {};

        for (let i = 0; i < entities.length; i++) {
          const ingreso = await calculateSumByTransactionTypeAndCurrency('Ingreso', 'amount', false, '', '', entities[i].value);
          const egreso = await calculateSumByTransactionTypeAndCurrency('Egreso', 'amount', false, '', '', entities[i].value);

          total[entities[i].key] = {
            bs: ingreso.bs - egreso.bs,
            usd: ingreso.usd - egreso.usd,
            eur: ingreso.eur - egreso.eur,
          };
        }

        return total;
      };
      const totalAvailableByEntities = await getTotalAvailableByEntities();

      const register = await this.closeCashFlowModel.create({
        data: {
          totals: data,
          temporalTransactions,
          totalAvailableByEntities,
          totalAvailableByEntitiesToday,
        },
      });
      const transporter = NodeMailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        post: this.configService.get<number>('MAIL_PORT'),
        secure: true,
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      } as any);

      const mailList = [
        'alexcarvajal2404@gmail.com',
        'mgonzalezh11@gmail.com'
      ]

      transporter
        .sendMail({
          to: mailList,
          cc: mailList,
          from: this.configService.get<string>('MAIL_FROM'),
          subject: 'Cierre de caja',
          text: 'texto',
          html: `Se genero un nuevo cierre de caja a erntre las: ${startDateTimeString} y ${endDateTimeString}`,
        })
        .then((data) => {
          this.logger.log('Se envio el correo de notificacion con exito!');
        })
        .catch((err) => {
          this.logger.error(err);
          return {
            error: true,
            message: `Ocurrio un error, ${JSON.stringify(err)}`,
          };
        });
      this.logger.log(register);
    } catch (err) {
      return {
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      };
    }
  }

  async findAllCloseCashFlows(filtersDto: FiltersDto, res: Response) {
    const { pageSize, pageIndex } = filtersDto;

    try {
      const data = await this.closeCashFlowModel.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['createdAt', 'desc']],
      });
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }
}
