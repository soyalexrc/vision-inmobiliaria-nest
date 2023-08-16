import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: 5432,
      host: '100.42.69.119',
      username: 'postgres',
      password: 'MySecretPassword',
      database: 'visionDEV',
      sync: {
        alter: true,
      },
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
      ],
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
  ],
})
export class AppModule {}
