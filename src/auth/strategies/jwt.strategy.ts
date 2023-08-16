import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "../../user/entities/user.entity";
import {JwtPayload} from "../interfaces/jwt-payload.interface";
import {InjectModel} from "@nestjs/sequelize";
import {ConfigService} from "@nestjs/config";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User) private userModel: typeof User,
        configService: ConfigService
    ) {
        super({
            secretOrKey : configService.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {email} = payload;

        const user = await this.userModel.findOne({
            where: {email: email}
        })

        if (!user)
            throw new UnauthorizedException('Token no valido!')
        //
        // if (!user.isActive) {
        //     throw new UnauthorizedException('Usuario inactivo, comuniquese con el administrador')
        // }



        return user;
    }

}