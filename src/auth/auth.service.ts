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
import * as NodeMailer from 'nodemailer';
import { TemporalId } from '../common/entities/temporalId.entity';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(TemporalId) private temporalIdModel: typeof TemporalId,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
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
    const { temporalId } = await this.temporalIdModel.create({ temporalId: uuid() });

    this.logger.debug(temporalId);

    const url = `${this.configService.get('HOST_URL')}/autenticacion/reestablecer-acceso?email=${fpDto.email}&code=${temporalId}`;

    try {
      const transporter = NodeMailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        post: this.configService.get<number>('MAIL_PORT'),
        secure: true,
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      } as any);

      transporter
        .sendMail({
          to: fpDto.email,
          from: this.configService.get<string>('MAIL_FROM'),
          subject: 'Recuperar acceso de sistema',
          text: 'welcome',
          html: `<b>Has click <a href="${url}">aqui</a> para reestablecer el acceso al sistema</b>`,
        })
        .then((data) => {
          res.status(HttpStatus.OK).send({
            data: {},
            message: `Se envio un mensaje con informacion para recuperar su acceso a su correo electronido: ${fpDto.email}`,
          });
        })
        .catch((err) => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            error: true,
            message: `Ocurrio un error, ${JSON.stringify(err)}`,
          });
        });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async recoverPassword(rpDto: RecoverPasswordDto, res: Response) {
    try {
      const { password, email, code } = rpDto;

      const temporalToken = await this.temporalIdModel.findOne({
        where: { temporalId: code },
      });

      if (!temporalToken) {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'El codigo de acceso se ha vencido, por favor inicie el proceso de nuevo.',
        });
        return;
      }

      const user = await this.userModel.findOne({
        where: { email: email },
      });

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `El usuari con el correo electronico: ${email}, no se encuentra registrado en nuestra base de datos. Por favor asegurese de escribir bien el la direccion de correo electronico.`,
        });
        return;
      }

      const data = await user.update({
        password: bcrypt.hashSync(password, 10),
      });

      await this.temporalIdModel.destroy({
        where: {
          id: temporalToken.id,
        },
      });

      res.status(HttpStatus.OK).send({
        data,
        message: 'Se actualizo su contrasena de ingreso con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }
}
