import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getAllowedRoutesByRole } from '../common/helpers/getAllowedRoutesByRole.helper';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

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
      console.log(bcrypt.compareSync(password, user.password));
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
      this.logger.error(err);
      return {
        message: `Ocurrio un error ${JSON.stringify(err)}`,
      };
    }
  }

  async forgotPassword(fpDto: ForgotPasswordDto, res: Response) {
    try {
      const emailSent = await this.mailService.sendMail({
        to: fpDto.email,
        from: 'infra@visioninmobiliaria.com.ve',
        subject: 'Testing nest mailermodule with template',
        text: 'welcome',
        html: '<b>Welcome</b>',
        // template: 'welcome',
        // context: {
        //   code: '123123',
        //   username: 'john due',
        //   url: 'https://google.com',
        // },
      });
      if (emailSent) {
        res.status(HttpStatus.OK).send({
          message: `Se envio un mensaje con instrucciones a tu correo electonrico, ${fpDto.email}`,
        });
      } else {
        res.status(HttpStatus.CONFLICT).send({
          message: `No se logro enviar un mensaje, ocurrio un error inesperado. Intente nuevamente`,
        });
      }
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }
}
