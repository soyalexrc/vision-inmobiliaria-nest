import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';
import { SubService } from './entities/sub-service.entity';

@Injectable()
export class ServiceService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Service) private serviceModel: typeof Service,
    @InjectModel(SubService) private subServiceModel: typeof SubService,
  ) {}

  async create(createServiceDto: CreateServiceDto, res: Response) {
    try {
      const service = await this.serviceModel.create({
        title: createServiceDto.serviceTitle,
      });
      const subServices = await this.subServiceModel.bulkCreate(
        createServiceDto.subServices.map((subService: SubService) => {
          return {
            title: subService.title,
            service_id: service.id,
          };
        }),
      );
      res.status(HttpStatus.OK).send({
        data: {
          service,
          subServices,
        },
        message: 'Se creo el servicio con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.serviceModel.findAll();
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async getSubServicesByServiceId(res: Response, serviceId: number | string) {
    try {
      const data = await this.subServiceModel.findAll({
        where: {
          service_id: serviceId,
        },
      });
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto, res: Response) {
    try {
      const service = await this.serviceModel.findOne({ where: { id } });

      if (!service) {
        res.status(HttpStatus.NOT_FOUND).send({
          message: `No se encontro el servicio con id, ${id}`,
        });
        return;
      }

      const serviceUpdated = await service.update({
        title: updateServiceDto.serviceTitle,
      });

      const subServicesToUpdate = async () => {
        updateServiceDto.subServices
          .filter((s: SubService) => s.id)
          .map(async (s: SubService) => {
            const sub = await this.subServiceModel.findOne({ where: { id: s.id } });
            return await sub.update({ title: s.title });
          });
      };

      const subServicesToCreate = updateServiceDto.subServices
        .filter((s: SubService) => s.id === null)
        .map((s: SubService) => ({
          title: s.title,
          service_id: id,
        }));

      const created = await this.subServiceModel.bulkCreate(subServicesToCreate);
      const data = await subServicesToUpdate();

      res.status(HttpStatus.OK).send({
        data: {
          created,
          updated: data,
          serviceUpdated,
        },
        message: 'Se edito el servicio con exito',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }

  async deleteSubService(id: number, res: Response) {
    try {
      await this.subServiceModel.destroy({
        where: { id },
      });

      res.status(HttpStatus.OK).send({
        data: {},
        message: 'Se elimino la opcion con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }
}
