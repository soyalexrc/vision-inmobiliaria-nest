import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.userModel.create(createUserDto as any);
      return {
        success: true,
        data,
        message: 'Se creo el usuario con exito!',
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
      // TODO Implementar paginacion en demas modulos
      const data = await this.userModel.findAndCountAll({
        limit: 5,
        offset: 0,
      });
      return {
        success: true,
        data,
        message: '',
      };
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.userModel.findOne({ where: { id: id } });
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
          message: 'No se encontro el usuario con el id ' + id,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userToUpdate = await this.userModel.findOne({ where: { id: id } });
      if (!userToUpdate)
        return {
          data: {},
          success: false,
          message: 'No se encontro el usuario con el id ' + id,
        };

      const data = await userToUpdate.update(updateUserDto);
      return {
        success: true,
        data,
        message: 'Se edito el usuario con exito!',
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
      const data = await this.userModel.destroy({ where: { id: id } });
      if (data === 0)
        return {
          success: false,
          data: {},
          message: 'No se logro eliminar el usuario con el id ' + id,
        };
      if (data !== 0)
        return {
          success: true,
          data: {},
          message: 'Se elimino el usuario con exito!',
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
