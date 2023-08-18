import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAllyDto } from './dto/create-ally.dto';
import { UpdateAllyDto } from './dto/update-ally.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ally } from './entities/ally.entity';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';

@Injectable()
export class AllyService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Ally) private allyModel: typeof Ally) {}
  async create(createAllyDto: CreateAllyDto, res: Response) {
    try {
      const data = await this.allyModel.create(createAllyDto as any);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo el aliado con exito!',
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async findAll(res: Response, paginationData: PaginationDataDto) {
    const { pageIndex, pageSize } = paginationData;
    try {
      const data = await this.allyModel.findAll({
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
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

  async findOne(id: number, res: Response) {
    try {
      const data = await this.allyModel.findOne({ where: { id: id } });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el aliado con el id ' + id,
        });
      }
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async update(id: number, updateAllyDto: UpdateAllyDto, res: Response) {
    try {
      const allyToUpdate = await this.allyModel.findOne({
        where: { id: id },
      });
      if (!allyToUpdate)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el aliado con el id ' + id,
        });

      const data = await allyToUpdate.update(updateAllyDto);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se edito el aliado con exito!',
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.allyModel.destroy({ where: { id: id } });
      if (data === 0)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se logro eliminar el aliado con el id ' + id,
        });
      if (data !== 0)
        res.status(HttpStatus.OK).send({
          message: 'Se elimino el aliado con exito!',
        });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }
}
