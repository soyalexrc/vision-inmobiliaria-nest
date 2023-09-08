import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateExternalAdviserDto } from './dto/create-external-adviser.dto';
import { UpdateExternalAdviserDto } from './dto/update-external-adviser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ExternalAdviser } from './entities/external-adviser.entity';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';

@Injectable()
export class ExternalAdviserService {
  private readonly logger = new Logger();

  constructor(@InjectModel(ExternalAdviser) private adviserModel: typeof ExternalAdviser) {}
  async create(createExternalAdviserDto: CreateExternalAdviserDto, res: Response) {
    try {
      const data = await this.adviserModel.create(createExternalAdviserDto as any);
      res.status(HttpStatus.OK).send({
        message: 'Se creo el asesor con exito!',
        data,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.adviserModel.findAll();
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findAllPaginated(paginationData: PaginationDataDto, res: Response) {
    const { pageSize, pageIndex } = paginationData;
    try {
      const data = await this.adviserModel.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
      });
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async findOne(id: number, res: Response) {
    try {
      const data = await this.adviserModel.findOne({ where: { id: id } });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se encontro el asesor externo con el id ' + id,
          error: true,
        });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async update(id: number, updateExternalAdviserDto: UpdateExternalAdviserDto, res: Response) {
    try {
      const userToUpdate = await this.adviserModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se encontro el asesor externo con el id ' + id,
          error: true,
        });

      const data = await userToUpdate.update(updateExternalAdviserDto);
      res.status(HttpStatus.OK).send({
        message: 'Se edito el asesor externo con exito!',
        data,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.adviserModel.destroy({ where: { id: id } });
      if (data === 0)
        res.status(HttpStatus.BAD_REQUEST).send({
          message: 'No se logro eliminar el asesor externo con el id ' + id,
          error: true,
        });
      if (data !== 0)
        res.status(HttpStatus.OK).send({
          message: 'Se elimino el asesor externo con exito!',
        });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }
}
