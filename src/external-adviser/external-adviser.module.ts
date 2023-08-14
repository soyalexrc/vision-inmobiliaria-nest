import { Module } from '@nestjs/common';
import { ExternalAdviserService } from './external-adviser.service';
import { ExternalAdviserController } from './external-adviser.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExternalAdviser } from './entities/external-adviser.entity';

@Module({
  imports: [SequelizeModule.forFeature([ExternalAdviser])],
  controllers: [ExternalAdviserController],
  providers: [ExternalAdviserService],
})
export class ExternalAdviserModule {}
