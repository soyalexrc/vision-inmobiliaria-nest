import { Injectable, Logger } from "@nestjs/common";
import { CreateAppConfigDto } from './dto/create-app-config.dto';
import { UpdateAppConfigDto } from './dto/update-app-config.dto';
import { InjectModel } from "@nestjs/sequelize";
import { AppConfig } from "./entities/app-config.entity";

@Injectable()
export class AppConfigService {
  private readonly logger = new Logger();

  constructor(@InjectModel(AppConfig) private appConfigModel: typeof AppConfig) {}
  create(createAppConfigDto: CreateAppConfigDto) {
    return 'This action adds a new appConfig';
  }

  async findAll() {
    try {
      return await this.appConfigModel.findAll();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findOneByCode(code: string) {
    try {
      const data = await this.appConfigModel.findOne({ where: { configCode: code } });
      if (!data) {
        return 'No data...';
      }
      return data;
    } catch (e) {
      this.logger.error(e);
    }
  }

  update(id: number, updateAppConfigDto: UpdateAppConfigDto) {
    return `This action updates a #${id} appConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} appConfig`;
  }
}
