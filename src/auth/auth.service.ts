import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getAllowedRoutesByRole } from '../common/helpers/getAllowedRoutesByRole.helper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(@InjectModel(User) private userModel: typeof User, private readonly jwtService: JwtService) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;
      const user = await this.userModel.findOne({
        where: { email: email },
      });
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `Error de credenciales: no se encontro un usuario con el email ${email}`,
        });
        return;
      } else if (!user.isActive) {
        res.status(HttpStatus.FORBIDDEN).send({
          error: true,
          title: `El usuario (${email}) se encuentra deshabilitado`,
          message: `Por favor comuniquese con el administrador para poder ingresar de nuevo.`,
        });
        return;
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: `Error de credenciales: contrasenas no coinciden!`,
        });
        return;
      } else {
        res.status(HttpStatus.OK).send({
          token: this.getJwtToken({ id: user.id }),
          message: `Bienvenido/@ de vuelta, ${user.username}`,
          userData: {
            email: user.email,
            id: user.id,
            username: user.username,
            userType: user.userType,
            image: '',
            allowedRoutes: getAllowedRoutesByRole(user.userType),
          },
        });
      }
    } catch (err) {
      return {
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }
}
