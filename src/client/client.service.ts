import { Injectable, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './entities/client.entity';
import { UpdateAllyDto } from '../ally/dto/update-ally.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Client) private clientModel: typeof Client) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const data = await this.clientModel.create(createClientDto as any);
      return {
        data,
        success: true,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        data: {},
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async findAll() {
    try {
      const data = await this.clientModel.findAll();
      return {
        data,
        success: true,
        message: '',
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
        data: {},
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.clientModel.findOne({ where: { id: id } });
      if (data) {
        return {
          success: true,
          data,
          message: '',
        };
      } else {
        return {
          data: {},
          success: false,
          message: 'No se encontro el cliente con el id ' + id,
        };
      }
    } catch (err) {
      return {
        data: {},
        success: false,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const userToUpdate = await this.clientModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        return {
          data: {},
          success: false,
          message: 'No se encontro el cliente con el id ' + id,
        };

      const data = await userToUpdate.update(updateClientDto);
      return {
        success: true,
        data,
        message: 'Se edito el cliente con exito!',
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async remove(id: number) {
    try {
      const data = await this.clientModel.destroy({ where: { id: id } });
      if (data === 0)
        return {
          success: false,
          data: {},
          message: 'No se logro eliminar el cliente con el id ' + id,
        };
      if (data !== 0)
        return {
          success: true,
          data: {},
          message: 'Se elimino el cliente con exito!',
        };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }
}
