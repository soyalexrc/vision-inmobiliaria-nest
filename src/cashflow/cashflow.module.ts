import { Module } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CashflowController } from './cashflow.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CashFlow } from './entities/cashflow.entity';
import { AuthModule } from '../auth/auth.module';
import { Property } from '../property/entities/property.entity';
import { Owner } from '../owner/entities/owner.entity';
import { Client } from '../client/entities/client.entity';
import { CashflowPerson } from './entities/cashflowPerson.entity';
import { ConfigModule } from '@nestjs/config';
import { CloseCashFlow } from './entities/closeCashflow.entity';
import { CashflowProperty } from "./entities/cashflowProperty.entity";
import { AppConfig } from "../app-config/entities/app-config.entity";

@Module({
  imports: [AuthModule, ConfigModule, SequelizeModule.forFeature([CashFlow, Property, Client, Owner, CashflowPerson, CloseCashFlow, CashflowProperty, AppConfig])],
  controllers: [CashflowController],
  providers: [CashflowService],
})
export class CashflowModule {}
