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
import { ClientModule } from './client/client.module';
import { OwnerModule } from './owner/owner.module';
import { Owner } from './owner/entities/owner.entity';
import { PropertyAttribute } from './property/entities/property-attribute.entity';
import { PropertyStatusEntry } from './property/entities/property-status-entry.entity';
import { TemporalId } from './common/entities/temporalId.entity';
import { DeleteFileRequest } from './common/entities/delete-file-request.entity';
import { File as FileEntity } from './common/files/entities/file.entity';
import { Error as ErrorEntity } from './common/error/entities/error.entity';
import { CashflowPerson } from './cashflow/entities/cashflowPerson.entity';
import { ServiceModule } from './service/service.module';
import { Service } from './service/entities/service.entity';
import { SubService } from './service/entities/sub-service.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CloseCashFlow } from './cashflow/entities/closeCashflow.entity';
import { DocumentsInformation } from './property/entities/documentsInformation.entity';
import { DigitalSignatureRequest } from './common/files/entities/digital-signature-request.entity';
import { CashflowProperty } from "./cashflow/entities/cashflowProperty.entity";
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfig } from "./app-config/entities/app-config.entity";
// import { ErrorMiddleware } from "./common/middlewares/error.middleware";
// import { ErrorModule } from "./common/error/error.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          timezone: 'America/Caracas',
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
            Attribute,
            FileEntity,
            ExternalAdviser,
            Property,
            CashflowPerson,
            CashflowProperty,
            GeneralInformation,
            LocationInformation,
            NegotiationInformation,
            DocumentsInformation,
            PropertyAttribute,
            Attribute,
            PropertyStatusEntry,
            DigitalSignatureRequest,
            TemporalId,
            Owner,
            Service,
            SubService,
            DeleteFileRequest,
            CloseCashFlow,
            AppConfig,
            ErrorEntity,
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
    ServiceModule,
    ConfigModule,
    AppConfigModule,
  ],
})
export class AppModule {}
