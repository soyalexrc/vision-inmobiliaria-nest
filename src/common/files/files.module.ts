import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';
import { DeleteFileRequest } from '../entities/delete-file-request.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule, SequelizeModule.forFeature([User, DeleteFileRequest])],
})
export class FilesModule {}
