import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { AppConfigController } from './app-config.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { AppConfig } from "./entities/app-config.entity";

@Module({
  imports: [SequelizeModule.forFeature([AppConfig])],
  controllers: [AppConfigController],
  providers: [AppConfigService]
})
export class AppConfigModule {}
