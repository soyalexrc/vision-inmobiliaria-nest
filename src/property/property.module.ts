import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { GeneralInformation } from './entities/generalInformation.entity';
import { LocationInformation } from './entities/locationInformation.entity';
import { PublicationSource } from './entities/publicationSource.entity';
import { NegotiationInformation } from './entities/negotiationInformation.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Property,
      GeneralInformation,
      LocationInformation,
      PublicationSource,
      NegotiationInformation,
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
