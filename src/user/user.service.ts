import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto, res: Response) {
    try {
      const { password, ...userData } = createUserDto;
      const data = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      res.status(HttpStatus.OK).send({
        data,
        message: 'Se creo el usuario con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async findAll(res: Response, paginationData: PaginationDataDto) {
    const { pageSize, pageIndex } = paginationData;
    try {
      const data = await this.userModel.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize - pageSize,
        order: [['id', 'desc']],
      });
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }
  async findAllAdvisers(res: Response) {
    try {
      const data = await this.userModel.findAll({
        where: {
          userType: 'Asesor inmobiliario',
        },
        order: [['id', 'desc']],
      });
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      return {
        success: false,
        data: {},
        message: 'Ocurrio un error ' + JSON.stringify(err),
      };
    }
  }

  async findOne(id: number, res: Response) {
    try {
      const data = await this.userModel.findOne({ where: { id: id } });
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el usuario con el id ' + id,
        });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, res: Response) {
    try {
      const userToUpdate = await this.userModel.findOne({ where: { id: id } });
      if (!userToUpdate)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el usuario con el id ' + id,
        });

      const data = await userToUpdate.update({
        ...updateUserDto,
        password: bcrypt.compareSync(userToUpdate.password, updateUserDto.password)
          ? updateUserDto.password
          : bcrypt.hashSync(updateUserDto.password, 10),
      });
      res.status(HttpStatus.OK).send({ data, message: 'Se edito el usuario con extito!' });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: 'Ocurrio un error ' + JSON.stringify(err),
      });
    }
  }

  async changeStatus(changeStatusDto: ChangeStatusDto, res: Response) {
    try {
      const user = await this.userModel.findOne({ where: { id: changeStatusDto.id } });

      if (!user)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se encontro el usuario con el id ' + changeStatusDto.id,
        });

      const data = await this.userModel.update(
        {
          isActive: changeStatusDto.value,
        },
        { where: { id: changeStatusDto.id } },
      );

      res.status(HttpStatus.OK).send({
        data: user,
        message: 'Se cambio el estatus del usuario con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }

  async remove(id: number, res: Response) {
    try {
      const data = await this.userModel.destroy({ where: { id: id } });
      if (data === 0)
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'No se logro eliminar el usuario con el id ' + id,
        });
      if (data !== 0)
        res.status(HttpStatus.OK).send({
          message: 'Se elimino el usuario con exito!',
        });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Ocurrio un error ' + JSON.stringify(err),
        error: true,
      });
    }
  }
}
