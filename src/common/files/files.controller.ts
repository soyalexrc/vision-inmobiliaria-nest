import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
  Res,
  Delete,
  Body
} from "@nestjs/common";
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileNamer, imageNamer } from '../helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { fileImageFilter } from "../helpers/fileFilter.helper";

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
        // destination: `./static/temp/images`,
        filename: imageNamer,
      }),
      // storage: memoryStorage(),
    }),
  )
  uploadPropertyImage(@UploadedFile() file: Express.Multer.File, @Param('code') code: string, @Res() res: Response) {
    return this.filesService.uploadPropertyImage(file, code, res);
  }

  @Post('propertyFile/:code')
  @UseInterceptors(
    FileInterceptor('file', {
      // fileFilter: fileImageFilter,
      limits: { fileSize: 200000000 },
      storage: diskStorage({
        destination: `./static/temp/files`,
        filename: fileNamer,
      }),
    }),
  )
  uploadPropertyFile(@UploadedFile() file: Express.Multer.File, @Param('code') code: string, @Res() res: Response) {
    return this.filesService.uploadPropertyFile(file, code, res);
  }

  @Post('uploadGenericStaticFile/:path')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 200000000 },
      storage: diskStorage({
        destination: `./static/temp/files`,
        filename: fileNamer,
      }),
    }),
  )
  uploadGenericFile(@UploadedFile() file: Express.Multer.File, @Param('path') path: string, @Res() res: Response) {
    return this.filesService.uploadGenericFile(file, path, res);
  }

  @Post('uploadFolder/:path')
  uploadFolder(@Param('path') path: string, @Res() res: Response) {
    return this.filesService.uploadFolder(path, res);
  }

  @Get('properties/:code/images/:imageName')
  getPropertyImage(@Res() res: Response, @Param('imageName') imageName: string, @Param('code') code: string) {
    const path = this.filesService.getStaticPropertyImage(code, imageName);
    res.sendFile(path);
  }

  @Get('genericStaticFileAsset/:path')
  getGenericStaticFileAsset(@Res() res: Response, @Param('path') path: string) {
    console.log(path);
    const pathFragments = path.includes('+') ? path.split('+').join('/') : path;
    const asset = this.filesService.getGenericStaticFileAsset(pathFragments);
    res.sendFile(asset);
  }

  @Post('genericStaticFile')
  getGenericStaticFile(@Res() res: Response, @Body() pathData: { path: string }) {
    return this.filesService.getGenericStaticFile(pathData.path, res);
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

  @Get('getElementsByPath/:path')
  getElementsByPath(@Res() res: Response, @Param('path') path: string) {
    return this.filesService.getElementsByPath(res, path);
  }

  @Delete('deleteFolderOrFile/:path')
  deleteFolderOrFile(@Param('path') path: string, @Res() res: Response) {
    return this.filesService.deleteFolderOrFile(path, res)
  }
}
