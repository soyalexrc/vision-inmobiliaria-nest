import { Module } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CashflowController } from './cashflow.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CashFlow } from './entities/cashflow.entity';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([CashFlow])],
  controllers: [CashflowController],
  providers: [CashflowService],
})
export class CashflowModule {}
