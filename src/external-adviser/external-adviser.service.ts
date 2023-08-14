import { Injectable, Logger } from '@nestjs/common';
import { CreateExternalAdviserDto } from './dto/create-external-adviser.dto';
import { UpdateExternalAdviserDto } from './dto/update-external-adviser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ExternalAdviser } from './entities/external-adviser.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class ExternalAdviserService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(ExternalAdviser) private adviserModel: typeof ExternalAdviser,
  ) {}
  async create(createExternalAdviserDto: CreateExternalAdviserDto) {
    try {
      const data = await this.adviserModel.create(
        createExternalAdviserDto as any,
      );
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
      const data = await this.adviserModel.findAll();
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
      const data = await this.adviserModel.findOne({ where: { id: id } });
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

  async update(id: number, updateExternalAdviserDto: UpdateExternalAdviserDto) {
    try {
      const userToUpdate = await this.adviserModel.findOne({
        where: { id: id },
      });
      if (!userToUpdate)
        return {
          data: {},
          success: false,
          message: 'No se encontro el asesor externo con el id ' + id,
        };

      const data = await userToUpdate.update(updateExternalAdviserDto);
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
      const data = await this.adviserModel.destroy({ where: { id: id } });
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
