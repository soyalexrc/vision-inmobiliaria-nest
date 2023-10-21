import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';
import { DeleteFileRequest } from '../entities/delete-file-request.entity';
import { DigitalSignatureRequest } from './entities/digital-signature-request.entity';
import { Client } from '../../client/entities/client.entity';
import { Owner } from '../../owner/entities/owner.entity';
import { ExternalAdviser } from '../../external-adviser/entities/external-adviser.entity';
import { Ally } from '../../ally/entities/ally.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User, DeleteFileRequest, DigitalSignatureRequest, Client, Owner, ExternalAdviser, Ally]),
  ],
})
export class FilesModule {}
