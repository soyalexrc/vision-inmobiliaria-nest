import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attribute } from './entities/attribute.entity';
import { Response } from 'express';
import { PropertyTypeDto } from './dto/property-type.dto';

@Injectable()
export class AttributesService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Attribute) private attributeModel: typeof Attribute) {}
  create(createAttributeDto: CreateAttributeDto) {
    return 'This action adds a new attribute';
  }

  findAll() {
    return `This action returns all attributes`;
  }
  async findAllByPropertyType(propertyTypeDto: PropertyTypeDto, res: Response) {
    try {
      const data = await this.attributeModel.findAll({
        where: {
          propertyType: propertyTypeDto.propertyType,
        },
      });

      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return `This action updates a #${id} attribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
