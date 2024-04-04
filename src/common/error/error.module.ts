import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Error as ErrorEntity } from './entities/error.entity';
@Module({
  providers: [ErrorService],
  imports: [SequelizeModule.forFeature([ErrorEntity])],
})
export class ErrorModule {}
