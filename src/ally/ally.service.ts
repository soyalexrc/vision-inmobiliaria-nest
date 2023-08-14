import { Injectable, Logger } from '@nestjs/common';
import { CreateAllyDto } from './dto/create-ally.dto';
import { UpdateAllyDto } from './dto/update-ally.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Ally } from './entities/ally.entity';

@Injectable()
export class AllyService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Ally) private allyModel: typeof Ally) {}
  async create(createAllyDto: CreateAllyDto) {
    try {
      const data = await this.allyModel.create(createAllyDto as any);
      return {
        success: true,
        data,
        message: 'Se creo el asesor externo con exito!',
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async findAll() {
    try {
      const data = await this.allyModel.findAll();
      return {
        success: true,
        data,
        message: '',
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

  async findOne(id: number) {
    try {
      const data = await this.allyModel.findOne({ where: { id: id } });
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
          message: 'No se encontro el asesor externo con el id ' + id,
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

  async update(id: number, updateAllyDto: UpdateAllyDto) {
    try {
      const userToUpdate = await this.allyModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        return {
          data: {},
          success: false,
          message: 'No se encontro el asesor externo con el id ' + id,
        };

      const data = await userToUpdate.update(updateAllyDto);
      return {
        success: true,
        data,
        message: 'Se edito el asesor externo con exito!',
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
      const data = await this.allyModel.destroy({ where: { id: id } });
      if (data === 0)
        return {
          success: false,
          data: {},
          message: 'No se logro eliminar el asesor externo con el id ' + id,
        };
      if (data !== 0)
        return {
          success: true,
          data: {},
          message: 'Se elimino el asesor externo con exito!',
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
