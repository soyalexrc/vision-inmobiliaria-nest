import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from './entities/owner.entity';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Property } from '../property/entities/property.entity';
@Injectable()
export class OwnerService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Owner) private ownerModel: typeof Owner) {}
  async create(createOwnerDto: CreateOwnerDto, res: Response) {
    try {
      const data = await this.ownerModel.create(createOwnerDto as any);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo el propietario con exito!',
      });
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
      const data = await this.ownerModel.findAndCountAll({
        order: [['id', 'desc']],
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
  async findAllPaginated(paginationData: PaginationDataDto, res: Response) {
    console.log(paginationData);
    const { pageSize, pageIndex } = paginationData;
    try {
      const data = await this.ownerModel.findAndCountAll({
        include: [Property],
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
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

  async findOne(id: number, res: Response) {
    try {
      const data = await this.ownerModel.findOne({ where: { id: id } });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el propietario con el id ' + id,
        });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }
  async update(id: number, updateOwnerDto: UpdateOwnerDto, res: Response) {
    try {
      const ownerToUpdate = await this.ownerModel.findOne({ where: { id: id } });
      if (!ownerToUpdate)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el propietario con el id ' + id,
        });

      const data = await ownerToUpdate.update(updateOwnerDto);
      res.status(HttpStatus.OK).send({ data, message: 'Se edito el propietario con extito!' });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.ownerModel.destroy({ where: { id: id } });
      if (data === 0)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se logro eliminar el propietario con el id ' + id,
        });
      if (data !== 0)
        res.status(HttpStatus.OK).send({
          message: 'Se elimino el propietario con exito!',
        });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }
}
