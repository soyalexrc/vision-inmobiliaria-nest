import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';
import { SubService } from './entities/sub-service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Service, SubService])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
