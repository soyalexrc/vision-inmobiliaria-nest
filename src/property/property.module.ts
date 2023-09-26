import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { GeneralInformation } from './entities/generalInformation.entity';
import { LocationInformation } from './entities/locationInformation.entity';
import { NegotiationInformation } from './entities/negotiationInformation.entity';
import { PropertyAttribute } from './entities/property-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { PropertyStatusEntry } from './entities/property-status-entry.entity';
import { ConfigModule } from '@nestjs/config';
import { DocumentsInformation } from "./entities/documentsInformation.entity";

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([
      Property,
      GeneralInformation,
      LocationInformation,
      NegotiationInformation,
      PropertyAttribute,
      PropertyStatusEntry,
      Attribute,
      DocumentsInformation,
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
