import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Property } from './entities/property.entity';
import { GeneralInformation } from './entities/generalInformation.entity';
import { LocationInformation } from './entities/locationInformation.entity';
import { NegotiationInformation } from './entities/negotiationInformation.entity';
import { PublicationSource } from './entities/publicationSource.entity';
import sequelize from 'sequelize';
import { Client } from '../client/entities/client.entity';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { PropertyAttribute } from './entities/property-attribute.entity';
import { ChangePropertyStatusDto } from './dto/change-property-status.dto';
import { PropertyStatusEntry } from './entities/property-status-entry.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PropertyService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Property) private propertyModel: typeof Property,
    @InjectModel(GeneralInformation)
    private generalInformationModel: typeof GeneralInformation,
    @InjectModel(LocationInformation)
    private locationInformation: typeof LocationInformation,
    @InjectModel(NegotiationInformation)
    private negotiationInformation: typeof NegotiationInformation,
    @InjectModel(PublicationSource)
    private publicationSource: typeof PublicationSource,
    @InjectModel(PropertyAttribute)
    private propertyAttributeModel: typeof PropertyAttribute,
    @InjectModel(PropertyStatusEntry)
    private propertyStatusModel: typeof PropertyStatusEntry,
  ) {}
  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const property = await this.propertyModel.create(createPropertyDto as any);

      // createPropertyDto.attributes.forEach((atribute: Attribute) => {
      //   this.propertyAttributeModel.create({
      //     property_id: property.id,
      //     attribute_id: atribute.id,
      //     value: atribute.value,
      //   });
      // });

      const generalInformation = await this.generalInformationModel.create({
        ...createPropertyDto.generalInformation,
        property_id: property.id,
      });

      const locationInformation = await this.locationInformation.create({
        ...createPropertyDto.locationInformation,
        property_id: property.id,
      });

      const negotiationInformation = await this.negotiationInformation.create({
        ...createPropertyDto.negotiationInformation,
        property_id: property.id,
      });

      const publicationSource = await this.publicationSource.create({
        ...createPropertyDto.publicationSource,
        property_id: property.id,
      });

      return {
        success: true,
        data: property,
        message: 'Se creo la propiedad con exito!',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async changeStatus(changePropertyStatusDto: ChangePropertyStatusDto, res: Response) {
    const { property_id, status } = changePropertyStatusDto;
    try {
      const propertyResource = await this.generalInformationModel.findOne({
        where: { property_id: property_id },
      });

      if (!propertyResource) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `No se encontro la propiedad con el id ${property_id}`,
        });
        return;
      }

      const resourceUpdated = await propertyResource.update({ status: status });

      const statusRegistry = await this.propertyStatusModel.create(changePropertyStatusDto as any);

      res.status(HttpStatus.OK).send({
        data: {
          resourceUpdated,
          statusRegistry,
        },
        message: 'Se actualizo el estado de la propiedad con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async getPropertyStatusHistoryById(id: number, res: Response) {
    try {
      const data = await this.propertyStatusModel.findAndCountAll({
        where: { property_id: id },
      });

      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      });
    }
  }

  async findAll(res: Response) {
    try {
      const count = await this.propertyModel.count();
      const data = await this.propertyModel.sequelize.query(
        `SELECT P.id, "propertyType", "operationType", price, images, ally_id, owner_id, code, country, city, municipality, state, P."createdAt", "minimumNegotiation", user_id, "reasonToSellOrRent", status, files, nomenclature, "footageGround", "footageBuilding", "distributionComments" FROM "Property" P INNER JOIN "GeneralInformation" GI ON p.id  = GI.property_id  INNER JOIN "LocationInformation" LI ON P.id = LI.property_id INNER JOIN "NegotiationInformation" NI ON P.id = NI.property_id INNER JOIN "PublicationSource" PS ON P.id = PS.property_id ORDER BY id DESC`,
        { type: sequelize.QueryTypes.SELECT },
      );
      res.status(HttpStatus.OK).send({
        rows: data,
        count,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      });
    }
  }

  async getPreviews(res: Response, paginationDto: PaginationDataDto) {
    const { pageIndex, pageSize } = paginationDto;
    try {
      const count = await this.propertyModel.count();
      const data = await this.propertyModel.sequelize.query(
        `SELECT P.id, "propertyType", "operationType", price, images, ally_id, owner_id, code, country, city, municipality, state, P."createdAt", "minimumNegotiation", user_id, "reasonToSellOrRent", status, files, nomenclature, "footageGround", "footageBuilding", "distributionComments" FROM "Property" P INNER JOIN "GeneralInformation" GI ON p.id  = GI.property_id  INNER JOIN "LocationInformation" LI ON P.id = LI.property_id INNER JOIN "NegotiationInformation" NI ON P.id = NI.property_id INNER JOIN "PublicationSource" PS ON P.id = PS.property_id LIMIT :customLimit OFFSET :customOffset`,
        { type: sequelize.QueryTypes.SELECT, replacements: { customOffset: pageIndex * pageSize - pageSize, customLimit: pageSize } },
      );
      res.status(HttpStatus.OK).send({
        rows: data,
        count,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      });
    }
  }
  async getPreviewsByUserId(res: Response, paginationDto: PaginationDataDto, userId: number) {
    const { pageIndex, pageSize } = paginationDto;
    try {
      const count = await this.propertyModel.count();
      const data = await this.propertyModel.sequelize.query(
        `SELECT P.id, "propertyType", "operationType", price, images, ally_id, owner_id, external_adviser_id, code, country, city, municipality, state, P."createdAt", "minimumNegotiation", user_id, "reasonToSellOrRent", status, files, nomenclature, "footageGround", "footageBuilding", "distributionComments" FROM "Property" P INNER JOIN "GeneralInformation" GI ON p.id  = GI.property_id  INNER JOIN "LocationInformation" LI ON P.id = LI.property_id INNER JOIN "NegotiationInformation" NI ON P.id = NI.property_id INNER JOIN "PublicationSource" PS ON P.id = PS.property_id  WHERE user_id = :userIdNumber LIMIT :customLimit OFFSET :customOffset`,
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: { customOffset: pageIndex * pageSize - pageSize, customLimit: pageSize, userIdNumber: userId },
        },
      );
      res.status(HttpStatus.OK).send({
        rows: data,
        count,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      });
    }
  }

  async getAllGeneralInformation() {
    try {
      const data = await this.generalInformationModel.findAll();
      return {
        data,
        success: true,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        data: {},
        success: false,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async getAllLocationInformation() {
    try {
      const data = await this.locationInformation.findAll();
      return {
        data,
        success: true,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        data: {},
        success: false,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }
  async getAllNegotiationInformation() {
    try {
      const data = await this.negotiationInformation.findAll();
      return {
        data,
        success: true,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        data: {},
        success: false,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }
  async getAllPublicationSource() {
    try {
      const data = await this.publicationSource.findAll();
      return {
        data,
        success: true,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        data: {},
        success: false,
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async findOne(id: number, res: Response) {
    try {
      const data = await this.propertyModel.findOne({
        where: { id: id },
        include: [GeneralInformation, LocationInformation, NegotiationInformation, PublicationSource, Client],
      });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: 'No se encontro la propiedad con el id ' + id,
        });
      }
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    try {
      const propertyToUpdate = await this.propertyModel.findOne({
        where: { id: id },
      });

      if (!propertyToUpdate)
        return {
          data: {},
          success: false,
          message: `No se encontro una propiedad con el id ${id}`,
        };

      propertyToUpdate.attributes = updatePropertyDto.attributes;

      const data = await propertyToUpdate.update(updatePropertyDto);

      const generalInformation = await this.generalInformationModel.update(
        { ...updatePropertyDto.generalInformation },
        { where: { property_id: propertyToUpdate.id } },
      );

      const locationInformation = await this.locationInformation.update(
        { ...updatePropertyDto.locationInformation },
        { where: { property_id: propertyToUpdate.id } },
      );

      const negotiationInformation = await this.negotiationInformation.update(
        { ...updatePropertyDto.negotiationInformation },
        { where: { property_id: propertyToUpdate.id } },
      );

      const publicationSource = await this.publicationSource.update(
        { ...updatePropertyDto.publicationSource },
        { where: { property_id: propertyToUpdate.id } },
      );

      return {
        data: {},
        message: 'Se edito la propiedad con exito!',
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async remove(id: number) {
    try {
      const data = [];
      data[0] = await this.generalInformationModel.destroy({
        where: { property_id: id },
      });
      data[1] = await this.locationInformation.destroy({
        where: { property_id: id },
      });
      data[2] = await this.publicationSource.destroy({
        where: { property_id: id },
      });
      data[3] = await this.negotiationInformation.destroy({
        where: { property_id: id },
      });

      data[4] = await this.propertyModel.destroy({ where: { id: id } });

      if (data.some((x: number) => x !== 1)) {
        return {
          data,
          success: false,
          message: 'No se logro completar la accion, por favor intenalo mas tarde o comunicate con soporte tecnico...',
        };
      }

      return {
        data,
        success: true,
        message: 'Se elimino la propiedad con exito!',
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async getAutomaticCode(res: Response) {
    try {
      const count = await this.propertyModel.count();
      const nextCodeDigit = count + 1;
      res.status(HttpStatus.OK).send({
        code: `VINM-${
          nextCodeDigit < 10 ? `00${nextCodeDigit}` : nextCodeDigit > 9 && nextCodeDigit < 100 ? `0${nextCodeDigit}` : nextCodeDigit
        }`,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }
}
