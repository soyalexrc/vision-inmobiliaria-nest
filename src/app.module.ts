import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { CashflowModule } from './cashflow/cashflow.module';
import { Client } from './client/entities/client.entity';
import { Ally } from './ally/entities/ally.entity';
import { User } from './user/entities/user.entity';
import { CashFlow } from './cashflow/entities/cashflow.entity';
import { ExternalAdviser } from './external-adviser/entities/external-adviser.entity';
import { Property } from './property/entities/property.entity';
import { AttributesModule } from './attributes/attributes.module';
import { Attribute } from './attributes/entities/attribute.entity';
import { UserModule } from './user/user.module';
import { ExternalAdviserModule } from './external-adviser/external-adviser.module';
import { AllyModule } from './ally/ally.module';
import { CommonModule } from './common/common.module';
import { GeneralInformation } from './property/entities/generalInformation.entity';
import { PropertyModule } from './property/property.module';
import { LocationInformation } from './property/entities/locationInformation.entity';
import { NegotiationInformation } from './property/entities/negotiationInformation.entity';
import { PublicationSource } from './property/entities/publicationSource.entity';
import { ClientModule } from './client/client.module';
import { OwnerModule } from './owner/owner.module';
import {Owner} from "./owner/entities/owner.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          port: configService.get<number>('DB_PORT'),
          host: configService.get<string>('DB_HOST'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          models: [
            Client,
            Ally,
            User,
            CashFlow,
            ExternalAdviser,
            Property,
            GeneralInformation,
            LocationInformation,
            NegotiationInformation,
            PublicationSource,
            Attribute,
            Owner,
          ],
        };
      },
    }),
    AuthModule,
    CashflowModule,
    AttributesModule,
    UserModule,
    ExternalAdviserModule,
    AllyModule,
    CommonModule,
    PropertyModule,
    ClientModule,
    OwnerModule,
  ],
})
export class AppModule {}
