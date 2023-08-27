import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attribute } from './entities/attribute.entity';
import { PropertyAttribute } from '../property/entities/property-attribute.entity';
import { Property } from '../property/entities/property.entity';

@Module({
  imports: [SequelizeModule.forFeature([Attribute, PropertyAttribute, Property])],
  controllers: [AttributesController],
  providers: [AttributesService],
})
export class AttributesModule {}
