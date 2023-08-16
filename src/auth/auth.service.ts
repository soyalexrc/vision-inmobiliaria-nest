import {Injectable, Logger} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/entities/user.entity";
import sequelize from "sequelize";
import * as bcrypt from 'bcrypt';
import {JwtPayload} from "./interfaces/jwt-payload.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

  private readonly logger = new Logger();

  constructor(
      @InjectModel(User) private userModel: typeof User,
      private readonly jwtService: JwtService,
  ) {
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDto: LoginDto) {
   try {
     const {email, password} = loginDto;
     const user = await this.userModel.findOne({
       where: {email: email}
     })
     // const user = await this.userModel.sequelize.query(`--
     // select "userType", email, username from "User" where email = :email
     // `, {type: sequelize.QueryTypes.SELECT, replacements: {email: email}})
     if (!user)
       return {
         data: {},
         success: false,
         message: `Error de credenciales: no se encontro un usuario con el email ${email}`
       }


     if (!bcrypt.compareSync(password, user.password))
       return {
         data: {},
         success: false,
         message: `Error de credenciales: contrasenas no coinciden!`
       }

     return {
       data: {
         token: this.getJwtToken({email: user.email}),
       },
       success: true,
       message: ''
     }
   } catch (err) {
     return {
       message: `Ocurrio un error ${JSON.stringify(err)}`
     }
   }
  }
}
