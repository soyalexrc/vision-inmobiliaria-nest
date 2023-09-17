import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { GeneralInformation } from './entities/generalInformation.entity';
import { LocationInformation } from './entities/locationInformation.entity';
import { PublicationSource } from './entities/publicationSource.entity';
import { NegotiationInformation } from './entities/negotiationInformation.entity';
import { PropertyAttribute } from './entities/property-attribute.entity';
import { Attribute } from '../attributes/entities/attribute.entity';
import { PropertyStatusEntry } from './entities/property-status-entry.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([
      Property,
      GeneralInformation,
      LocationInformation,
      PublicationSource,
      NegotiationInformation,
      PropertyAttribute,
      PropertyStatusEntry,
      Attribute,
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
