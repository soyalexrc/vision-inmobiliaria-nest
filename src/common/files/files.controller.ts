import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, Delete, Body, Query } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileNamer } from '../helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ChangeNameDto } from './dto/change-name.dto';
import { MoveFileOrFolderDto } from './dto/move-file-or-folder.dto';
import { CreateDigitalSignatureRequestDto } from './dto/create-digital-signature-request.dto';
import { FiltersDto } from '../../cashflow/dto/filters.dto';
import { UserDataForSignatureValidationDto } from './dto/user-data-for-signature-validation.dto';
import { SendDigitalSignatureDto } from './dto/sendDigitalSignature.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadGenericStaticFile/:path')
  @UseInterceptors(
    FileInterceptor('file', {
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

  @Get('genericStaticFileAsset/:path')
  getGenericStaticFileAsset(@Res() res: Response, @Param('path') path: string) {
    const pathFragments = path.includes('+') ? path.split('+').join('/') : path;
    const asset = this.filesService.getGenericStaticFileAsset(pathFragments);
    res.sendFile(asset);
  }

  @Post('changeName/:path')
  changeFileOrFolderName(@Param('path') path: string, @Body() changeNameDto: ChangeNameDto, @Res() res: Response) {
    return this.filesService.changeFileOrFolderName(path, changeNameDto, res);
  }

  @Post('genericStaticFile')
  getGenericStaticFile(@Res() res: Response, @Body() pathData: { path: string }) {
    return this.filesService.getGenericStaticFile(pathData.path, res);
  }

  @Get('getElementsByPath/:path')
  getElementsByPath(@Res() res: Response, @Param('path') path: string) {
    return this.filesService.getElementsByPath(res, path);
  }

  @Delete('deleteFolderOrFile/:path')
  deleteFolderOrFile(@Param('path') path: string, @Res() res: Response) {
    return this.filesService.deleteFolderOrFile(path, res);
  }

  @Post('requestDeleteFolderOrFile/:path/:userId')
  requestDeleteFolderOrFile(@Param('path') path: string, @Param('userId') userId: string, @Res() res: Response) {
    return this.filesService.requestDeleteFolderOrFile(path, +userId, res);
  }

  @Get('requestDeleteFolderOrFile')
  getRequestDeleteFolderOrFile(@Res() res: Response) {
    return this.filesService.getRequestDeleteFolderOrFile(res);
  }

  @Delete('cancelDeleteRequest/:id')
  cancelDeleteRequest(@Param('id') id: string, @Res() res: Response) {
    return this.filesService.cancelDeleteRequest(+id, res);
  }

  @Post('acceptDeleteRequest/:id')
  acceptDeleteRequest(@Param('id') id: string, @Res() res: Response) {
    return this.filesService.acceptDeleteRequest(+id, res);
  }

  @Post('moveFileOrFolder')
  moveFileOrFolder(@Res() res: Response, @Body() moveFileOrFolderDto: MoveFileOrFolderDto) {
    return this.filesService.moveFileOrFolder(moveFileOrFolderDto, res);
  }

  //   Digital signature

  @Post('createDigitalSignatureRequest')
  createDigitalSignatureRequest(@Res() res: Response, @Body() createDigitalSignatureRequestDto: CreateDigitalSignatureRequestDto) {
    return this.filesService.createDigitalSignatureRequest(res, createDigitalSignatureRequestDto);
  }

  @Get('getDigitalSignatureRequests')
  getDigitalSignatureRequests(@Res() res: Response, @Query() filtersDto: FiltersDto) {
    return this.filesService.getDigitalSignatureRequests(res, filtersDto);
  }
  @Get('getDigitalSignatureRequestById/:id')
  getDigitalSignatureRequestById(@Res() res: Response, @Param('id') id: string) {
    return this.filesService.getDigitalSignatureRequestById(res, id);
  }

  @Post('resendDigitalSignatureRequest')
  resendDigitalSignatureRequest(@Res() res: Response, @Body() reqBody: { id: string | number }) {
    return this.filesService.resendDigitalSignatureRequest(res, reqBody);
  }
  @Post('validateUserForSignatureAuthorization')
  validateUserForSignatureAuthorization(
    @Res() res: Response,
    @Body() userDataForSignatureValidationDto: UserDataForSignatureValidationDto,
  ) {
    return this.filesService.validateUserForSignatureAuthorization(res, userDataForSignatureValidationDto);
  }

  @Post('sendDigitalSignature')
  sendDigitalSignature(@Res() res: Response, @Body() sendDigitalSignatureDto: SendDigitalSignatureDto) {
    return this.filesService.sendDigitalSignature(res, sendDigitalSignatureDto);
  }
}
