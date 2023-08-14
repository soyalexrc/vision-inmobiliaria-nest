import { All, Module } from '@nestjs/common';
import { AllyService } from './ally.service';
import { AllyController } from './ally.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ally } from './entities/ally.entity';

@Module({
  imports: [SequelizeModule.forFeature([Ally])],
  controllers: [AllyController],
  providers: [AllyService],
})
export class AllyModule {}
