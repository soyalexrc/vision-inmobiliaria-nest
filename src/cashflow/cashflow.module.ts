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

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([CashFlow, Property, Client, Owner, CashflowPerson])],
  controllers: [CashflowController],
  providers: [CashflowService],
})
export class CashflowModule {}
