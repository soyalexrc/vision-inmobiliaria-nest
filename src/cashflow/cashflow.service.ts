import { Injectable, Logger } from '@nestjs/common';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CashFlow } from './entities/cashflow.entity';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

@Injectable()
export class CashflowService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(CashFlow) private cashFlowModel: typeof CashFlow,
    @InjectConnection() private sequelize: Sequelize,
  ) {}
  async create(createCashflowDto: CreateCashflowDto) {
    try {
      const data = await this.cashFlowModel.create(createCashflowDto as any);
      return {
        success: true,
        data,
        message: 'Se creo el registro con exito!',
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async findAll() {
    try {
      const data = await this.cashFlowModel.findAll();
      return {
        success: true,
        data,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }
  async getTemporalTransactions() {
    try {
      const data = await this.cashFlowModel.findAll({
        where: {
          isTemporalTransaction: true,
        },
      });
      return {
        success: true,
        data,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async getTotals() {
    try {
      const ingreso = await this.cashFlowModel.sequelize.query(
        `
            select (select sum (cast(amount as decimal)) as BS  from "CashFlow" where "transactionType" = 'Ingreso' and currency = 'Bs' and "isTemporalTransaction" = false), (select sum (cast(amount as decimal)) as USD from "CashFlow" where "transactionType" = 'Ingreso' and currency = '$' and "isTemporalTransaction" = false), (select sum (cast(amount as decimal)) as EUR from "CashFlow" where "transactionType" = 'Ingreso' and currency = '€' and "isTemporalTransaction" = false) ;
        `,
        { type: sequelize.QueryTypes.SELECT },
      );
      const egreso = await this.cashFlowModel.sequelize.query(
        `select (select sum (cast(amount as decimal)) as BS  from "CashFlow" where "transactionType" = 'Egreso' and currency = 'Bs' and "isTemporalTransaction" = false), (select sum (cast(amount as decimal)) as USD from "CashFlow" where "transactionType" = 'Egreso' and currency = '$' and "isTemporalTransaction" = false), (select sum (cast(amount as decimal)) as EUR from "CashFlow" where "transactionType" = 'Egreso' and currency = '€' and "isTemporalTransaction" = false) ;`,
        { type: sequelize.QueryTypes.SELECT },
      );

      const cuentasPorCobrar = await this.cashFlowModel.sequelize.query(
        `select (select sum (cast("pendingToCollect" as decimal)) as BS  from "CashFlow" where ("transactionType" = 'Cuenta por cobrar' or "transactionType" = 'Ingreso') and currency = 'Bs' and "isTemporalTransaction" = false), (select sum (cast("pendingToCollect" as decimal)) as USD from "CashFlow" where ("transactionType" = 'Cuenta por cobrar' or "transactionType" = 'Ingreso') and currency = '$' and "isTemporalTransaction" = false), (select sum (cast("pendingToCollect" as decimal)) as EUR from "CashFlow" where ("transactionType" = 'Cuenta por cobrar' or "transactionType" = 'Ingreso') and currency = '€' and "isTemporalTransaction" = false) ;`,
        { type: sequelize.QueryTypes.SELECT },
      );

      const cuentasPorPagar = await this.cashFlowModel.sequelize.query(
        `select (select sum (cast("totalDue" as decimal)) as BS  from "CashFlow" where ("transactionType" = 'Cuenta por pagar' or "transactionType" = 'Ingreso') and currency = 'Bs' and "isTemporalTransaction" = false), (select sum (cast("totalDue" as decimal)) as USD from "CashFlow" where ("transactionType" = 'Cuenta por pagar' or "transactionType" = 'Ingreso') and currency = '$' and "isTemporalTransaction" = false), (select sum (cast("totalDue" as decimal)) as EUR from "CashFlow" where ("transactionType" = 'Cuenta por pagar' or "transactionType" = 'Ingreso') and currency = '€' and "isTemporalTransaction" = false) ;`,
        { type: sequelize.QueryTypes.SELECT },
      );
      return {
        success: true,
        data: {
          ingreso: ingreso[0],
          egreso: egreso[0],
          cuentasPorPagar: cuentasPorPagar[0],
          cuentasPorCobrar: cuentasPorCobrar[0],
        },
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.cashFlowModel.findOne({ where: { id: id } });
      if (data) {
        return {
          success: true,
          data,
          message: '',
        };
      } else {
        return {
          data: {},
          success: false,
          message: 'No se encontro el registro con el id ' + id,
        };
      }
    } catch (err) {
      return {
        data: {},
        success: false,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async update(id: number, updateCashflowDto: UpdateCashflowDto) {
    try {
      const userToUpdate = await this.cashFlowModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        return {
          data: {},
          success: false,
          message: 'No se encontro el registro con el id ' + id,
        };

      const data = await userToUpdate.update(updateCashflowDto);
      return {
        success: true,
        data,
        message: 'Se edito el registro con exito!',
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async remove(id: number) {
    try {
      const data = await this.cashFlowModel.destroy({ where: { id: id } });
      if (data === 0)
        return {
          success: false,
          data: {},
          message: 'No se logro eliminar el registro con el id ' + id,
        };
      if (data !== 0)
        return {
          success: true,
          data: {},
          message: 'Se elimino el registro con exito!',
        };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }
}
