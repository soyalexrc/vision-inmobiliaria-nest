import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './entities/client.entity';
import { UpdateAllyDto } from '../ally/dto/update-ally.dto';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { FiltersDto } from '../cashflow/dto/filters.dto';
import { filtersCleaner } from '../common/helpers/filtersCleaner';
import sequelize_2 from 'sequelize';

@Injectable()
export class ClientService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Client) private clientModel: typeof Client) {}

  async create(createClientDto: CreateClientDto, res: Response) {
    try {
      const data = await this.clientModel.create(createClientDto as any);
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo el cliente con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async changeStatus(changeStatusDto: { status: string; id: number }, res: Response) {
    try {
      const client = await this.clientModel.findOne({ where: { id: changeStatusDto.id } });

      if (!client) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `No se encontro el cliente con el id ${changeStatusDto.id}`,
        });
        return;
      }

      this.logger.debug(client);
      this.logger.debug(changeStatusDto);

      const data = await client.update({ ...client, requirementStatus: changeStatusDto.status });

      this.logger.debug(data);

      res.status(HttpStatus.OK).send({
        message: 'Se creo el cliente con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.clientModel.findAll();
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async getPreviews(res: Response, filtersDto: FiltersDto) {
    const { pageIndex, pageSize, service, operationType, requirementStatus, dateFrom, dateTo } = filtersDto;

    const whereClause = filtersCleaner({
      service,
      operationType,
      requirementStatus,
    });

    if (dateFrom && dateTo) {
      whereClause.createdAt = {
        [sequelize_2.Op.between]: [dateFrom, dateTo],
      };
    }

    try {
      const data = await this.clientModel.findAndCountAll({
        attributes: ['id', 'createdAt', 'name', 'requirementStatus', 'phone', 'contactFrom', 'operationType', 'service'],
        limit: pageSize,
        where: whereClause,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
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

  async findOne(id: number, res: Response) {
    try {
      const data = await this.clientModel.findOne({ where: { id: id } });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          error: true,
          message: `No se encontro el cliente con el id ${id}`,
        });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto, res: Response) {
    try {
      const userToUpdate = await this.clientModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: `No se encontro el cliente con el id ${id}`,
        });

      const data = await userToUpdate.update(updateClientDto);
      res.status(HttpStatus.OK).send({
        data,
        message: `Se edito el cliente con exito!`,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.clientModel.destroy({ where: { id: id } });
      if (data === 0)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se logro eliminar el cliente con el id ' + id,
        });
      if (data !== 0)
        res.status(HttpStatus.OK).send({
          message: 'Se elimino el cliente con exito!',
        });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }
}
