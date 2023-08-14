import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileImageFilter } from '../helpers/fileFilter.helper';
import { fileNamer } from '../helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { join } from 'path';
import * as mv from 'mv';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Files Management')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('propertyImage/:code')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileImageFilter,
      // limits: {fileSize: 10000}
      storage: diskStorage({
        destination: `./static/temp/images`,
        filename: fileNamer,
      }),
    }),
  )
  uploadPropertyImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('code') code: string,
  ) {
    if (!file) {
      throw new BadRequestException('Asegurese que el archivo es una imagen!');
    }

    const currentPath = join( __dirname, '../../../static/temp/images', file.filename );
    const destinationPath = join(
      __dirname,
      `../../../static/properties/${code}/images`,
      file.filename,
    );

    mv(currentPath, destinationPath, (err) => {
      if (err) {
        throw new BadRequestException('Ocurrio un error al mover el archivo');
      } else {
        console.log('Successfully moved the file!');
      }
    });

    const secureUrl = `${this.configService.get(
      'HOST_API',
    )}/files/properties/${code}/${file.filename}`;

    return { secureUrl };
  }

  @Get('properties/:code/:imageName')
  getPropertyImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
    @Param('code') code: string,
  ) {
    const path = this.filesService.getStaticPropertyImage(code, imageName);
    res.sendFile(path);
  }
}
