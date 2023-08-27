import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get, Param, Res, Delete } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileImageFilter } from '../helpers/fileFilter.helper';
import { fileNamer, imageNamer } from '../helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files Management')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('propertyImage/:code')
  @UseInterceptors(
    FileInterceptor('file', {
      // fileFilter: fileImageFilter,
      // limits: {fileSize: 10000}
      storage: diskStorage({
        destination: `./static/temp/images`,
        filename: imageNamer,
      }),
    }),
  )
  uploadPropertyImage(@UploadedFile() file: Express.Multer.File, @Param('code') code: string, @Res() res: Response) {
    return this.filesService.uploadPropertyImage(file, code, res);
  }

  @Post('propertyFile/:code')
  @UseInterceptors(
    FileInterceptor('file', {
      // fileFilter: fileImageFilter,
      // limits: {fileSize: 10000}
      storage: diskStorage({
        destination: `./static/temp/files`,
        filename: fileNamer,
      }),
    }),
  )
  uploadPropertyFile(@UploadedFile() file: Express.Multer.File, @Param('code') code: string, @Res() res: Response) {
    return this.filesService.uploadPropertyFile(file, code, res);
  }

  @Get('properties/:code/images/:imageName')
  getPropertyImage(@Res() res: Response, @Param('imageName') imageName: string, @Param('code') code: string) {
    const path = this.filesService.getStaticPropertyImage(code, imageName);
    res.sendFile(path);
  }

  @Get('properties/:code/files/:fileName')
  getPropertyFile(@Res() res: Response, @Param('fileName') fileName: string, @Param('code') code: string) {
    const path = this.filesService.getStaticPropertyFile(code, fileName);
    res.sendFile(path);
  }

  @Delete('propertyImage/:code/:fileName')
  removePropertyImage(@Res() res: Response, @Param('fileName') fileName: string, @Param('code') code: string) {
    return this.filesService.removePropertyImage(fileName, code, res);
  }

  @Delete('propertyFile/:code/:fileName')
  removePropertyFile(@Res() res: Response, @Param('fileName') fileName: string, @Param('code') code: string) {
    return this.filesService.removePropertyFile(fileName, code, res);
  }
}
