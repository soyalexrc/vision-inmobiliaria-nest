import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import * as fs from 'fs';
import * as mv from 'mv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as sharp from 'sharp';
import { ChangeNameDto } from './dto/change-name.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user/entities/user.entity';
import { DeleteFileRequest } from '../entities/delete-file-request.entity';
import { MoveFileOrFolderDto } from './dto/move-file-or-folder.dto';
import { extractZip } from '../helpers/extractZip';
import { extractRar } from '../helpers/extractRar';
import { CreateDigitalSignatureRequestDto } from './dto/create-digital-signature-request.dto';
import { Owner } from '../../owner/entities/owner.entity';
import { Client } from '../../client/entities/client.entity';
import { Ally } from '../../ally/entities/ally.entity';
import { ExternalAdviser } from '../../external-adviser/entities/external-adviser.entity';
import { DigitalSignatureRequest } from './entities/digital-signature-request.entity';
import * as NodeMailer from 'nodemailer';
import { FiltersDto } from '../../cashflow/dto/filters.dto';
import { filtersCleaner } from '../helpers/filtersCleaner';
import { Op } from 'sequelize';
import { getFutureDateISOStringBasedOnHours } from '../helpers/date';

@Injectable()
export class FilesService {
  private readonly logger = new Logger();
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Owner) private ownerModel: typeof Owner,
    @InjectModel(Client) private clientModel: typeof Client,
    @InjectModel(Ally) private allyModel: typeof Ally,
    @InjectModel(ExternalAdviser) private adviserModel: typeof ExternalAdviser,
    @InjectModel(DigitalSignatureRequest) private digitalSignatureRequestModel: typeof DigitalSignatureRequest,
    @InjectModel(DeleteFileRequest) private deleteFileRequestModel: typeof DeleteFileRequest,
  ) {}

  getGenericStaticFileAsset(path: string): string {
    const pathToLookUp = join(__dirname, '../../../static', path);
    if (!fileExistsSync(pathToLookUp)) throw new BadRequestException('No se econtro el archivo deseado ');
    return pathToLookUp;
  }

  getGenericStaticFile(path: string, res: Response) {
    const secureUrl = `${this.configService.get('HOST_API')}/files/genericStaticFileAsset/${path}`;
    res.status(HttpStatus.OK).send({ secureUrl });
  }

  async uploadGenericFile(file: Express.Multer.File, path: string, res: Response) {
    const pathFormatted = path.split('+').join('/');
    const temporalPath = join(__dirname, '../../../static/temp/files', file.filename);
    let destinationPath = '';

    const fileExtension = file.mimetype.split('/')[1];
    const validImageExtensions = ['jpg', 'png', 'jpeg', 'webp'];

    if (!file) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: true,
        message: 'Asegurese de ingresar un documento',
      });
    }
    if (fileExtension.includes('zip')) {
      destinationPath = join(__dirname, '../../../static', pathFormatted);

      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(join(__dirname, `../../../static`, pathFormatted), { recursive: true });
      }
      await extractZip(temporalPath, destinationPath);
      fs.rmSync(temporalPath);

      res.status(HttpStatus.OK).send({
        data: {},
        message: 'Se Descomprimio el documento con exito!',
      });
    } else if (fileExtension.includes('rar')) {
      destinationPath = join(__dirname, '../../../static', pathFormatted);

      await extractRar(temporalPath, destinationPath);
      res.status(HttpStatus.OK).send({
        data: {},
        message: 'Se Descomprimio el documento con exito!',
      });
    } else if (validImageExtensions.some((img) => img === fileExtension)) {
      destinationPath = join(__dirname, '../../../static', pathFormatted, file.filename);

      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(join(__dirname, `../../../static`, pathFormatted), { recursive: true });
      }

      sharp(temporalPath)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(destinationPath, (err, info) => {
          if (!err) {
            fs.rmSync(temporalPath);
            const secureUrl = `${this.configService.get('HOST_API')}/files/genericStaticFileAsset/${path}+${file.filename}`;
            res.status(HttpStatus.OK).send({ secureUrl });
          } else {
            this.logger.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              error: true,
              message: err,
            });
          }
        });
    } else {
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(join(__dirname, `../../../static`, pathFormatted), { recursive: true });
      }
      destinationPath = join(__dirname, '../../../static', pathFormatted, file.filename);
      mv(temporalPath, destinationPath, (err) => {
        if (err) {
          this.logger.error(err);
          throw new BadRequestException('Ocurrio un error al mover el archivo');
        } else {
          console.log('Successfully moved the file!');
        }
      });

      const secureUrl = `${this.configService.get('HOST_API')}/files/genericStaticFileAsset/${path}+${file.filename}`;

      res.status(HttpStatus.OK).send({ secureUrl });
    }
  }

  getElementsByPath(res: Response, path: string) {
    const pathFragments = path === 'root' ? '' : path.split('+').join('/');
    try {
      const path = join(__dirname, '../../../static/', pathFragments);
      const rawFiles = fs.readdirSync(path);
      const filesWithType = [];
      rawFiles.forEach((file: string) => {
        const stats = fs.statSync(join(path, file));
        if (stats.isFile()) filesWithType.push({ file, type: 'file' });
        if (stats.isDirectory()) filesWithType.push({ file, type: 'dir' });
      });
      res.status(HttpStatus.OK).send(filesWithType);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  uploadFolder(path: string, res: Response) {
    const pathFormatted = path.split('+').join('/');

    const destinationPath = join(__dirname, '../../../static', pathFormatted);

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(join(__dirname, `../../../static`, pathFormatted), { recursive: true });
    }

    res.status(HttpStatus.OK).send({
      data: {},
      message: 'Se creo la carpeta con exito!',
    });
  }

  changeFileOrFolderName(path: string, changeNameDto: ChangeNameDto, res: Response) {
    const pathFormatted = join(__dirname, '../../../static', path.split('+').join('/'));
    const newPathName = join(__dirname, '../../../static', changeNameDto.newName.split('+').join('/'));
    try {
      fs.renameSync(pathFormatted, newPathName);
      res.status(HttpStatus.OK).send({
        data: {},
        message: `Se cambio el nombre de ${changeNameDto.isFile ? 'el documento' : 'la carpeta'}, con exito!`,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${err}`,
      });
    }
  }

  deleteFolderOrFile(path: string, res: Response) {
    this.logger.debug(path);
    const pathFormatted = path.split('+').join('/');
    const destinationPath = join(__dirname, '../../../static', pathFormatted);
    const dirStats = fs.statSync(destinationPath);

    if (!fs.existsSync(destinationPath)) {
      res.status(HttpStatus.NOT_FOUND).send({
        error: true,
        message: 'No se encontro el documento archivo solicitado',
      });
    }

    if (dirStats.isFile()) {
      fs.rmSync(destinationPath);
    } else {
      const filesInsideDir = fs.readdirSync(destinationPath);
      if (filesInsideDir.length > 0) {
        filesInsideDir.forEach((file: string) => {
          fs.unlinkSync(join(destinationPath, file));
        });
        fs.rmdirSync(destinationPath);
      } else {
        fs.rmdirSync(destinationPath);
      }
    }

    res.status(HttpStatus.OK).send({
      data: {},
      message: 'Se elimino el archivo con exito!',
    });
  }
  async requestDeleteFolderOrFile(path: string, userId: number, res: Response) {
    const destinationPath = join(__dirname, '../../../static', path.split('+').join('/'));
    const dirStats = fs.statSync(destinationPath);

    try {
      if (!fs.existsSync(destinationPath)) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: 'No se encontro el documento archivo solicitado',
        });
        return;
      }

      const user = await this.userModel.findOne({ where: { id: userId } });

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: 'Ocurrio un error identificando al usuario.',
        });
        return;
      }

      const data = await this.deleteFileRequestModel.create({
        path: destinationPath,
        user: `${user.firstName} ${user.lastName} (${user.username})`,
        type: dirStats.isFile() ? 'Documento' : 'Carpeta',
      });

      res.status(HttpStatus.OK).send({
        data: data,
        message: 'Se registro la solicitud de eliminacion con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async getRequestDeleteFolderOrFile(res: Response) {
    try {
      const data = await this.deleteFileRequestModel.findAndCountAll();
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async cancelDeleteRequest(id: number, res: Response) {
    try {
      const data = await this.deleteFileRequestModel.destroy({
        where: { id },
      });
      res.status(HttpStatus.OK).send({ data, message: 'Se elimino la solicitud con exito!' });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async acceptDeleteRequest(id: number, res: Response) {
    try {
      const request = await this.deleteFileRequestModel.findOne({
        where: { id },
      });

      const path = request.path;

      const dirStats = fs.statSync(path);

      if (!fs.existsSync(path)) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: 'No se encontro el documento archivo solicitado',
        });
      }

      if (dirStats.isFile()) {
        fs.rmSync(path);
      } else {
        const filesInsideDir = fs.readdirSync(path);
        if (filesInsideDir.length > 0) {
          filesInsideDir.forEach((file: string) => {
            fs.unlinkSync(join(path, file));
          });
          fs.rmdirSync(path);
        } else {
          fs.rmdirSync(path);
        }
      }

      const deletedData = await this.deleteFileRequestModel.destroy({
        where: {
          id: request.id,
        },
      });
      res.status(HttpStatus.OK).send({ data: deletedData, message: 'Se elimino el archivo / carpeta con exito!' });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async moveFileOrFolder(moveFileOrFolderDto: MoveFileOrFolderDto, res: Response) {
    const { pathTo, pathFrom } = moveFileOrFolderDto;
    try {
      const formattedPathFrom = join(__dirname, '../../../static', pathFrom.split('+').join('/'));
      const formattedPathTo = join(__dirname, '../../../static', pathTo.split('+').join('/'));

      mv(formattedPathFrom, formattedPathTo, (err) => {
        if (err) {
          this.logger.error(err);
          throw new BadRequestException('Ocurrio un error al mover el archivo');
        } else {
          console.log('Successfully moved the file!');
        }
      });
      res.status(HttpStatus.OK).send({
        data: {},
        message: 'Se movio el documento con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async createDigitalSignatureRequest(res: Response, createDigitalSignatureRequestDto: CreateDigitalSignatureRequestDto) {
    const { filePath, sendToData, requestedBy } = createDigitalSignatureRequestDto;
    try {
      switch (sendToData.type) {
        case 'Propietarios':
          const ownerToConsult = await this.ownerModel.findOne({ where: { id: sendToData.id } });
          if (!ownerToConsult.ci) {
            res.status(HttpStatus.BAD_REQUEST).send({
              error: true,
              message: `Por favor, actualiza los datos de el propietario: ${ownerToConsult.firstName} ${ownerToConsult.lastName}. No tiene registrada CEDULA DE IDENTIDAD en el sistema.`,
            });
            return;
          }
          if (!ownerToConsult.phone) {
            res.status(HttpStatus.BAD_REQUEST).send({
              error: true,
              message: `Por favor, actualiza los datos de el propietario: ${ownerToConsult.firstName} ${ownerToConsult.lastName}. No tiene registrada NUMERO DE TELEFONO en el sistema.`,
            });
            return;
          }
          // TODO create the digital signature request

          this.logger.debug(getFutureDateISOStringBasedOnHours(48));

          const data = await this.digitalSignatureRequestModel.create({
            filePath: `${this.configService.get<string>('HOST_API')}/files/genericStaticFileAsset/${filePath}`,
            sendToEmail: sendToData.email,
            requestedBy,
            status: 'Pendiente',
            sendToData,
            signedDocumentPath: '',
            ownerId: sendToData.id,
            clientId: null,
            allyId: null,
            externalAdviserId: null,
            expiresAt: getFutureDateISOStringBasedOnHours(48),
          });

          const url = `${this.configService.get('NEXT_API').replace('/api', '')}/firma-digital/${data.id}`;

          const transporter = NodeMailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            post: this.configService.get<number>('MAIL_PORT'),
            secure: true,
            auth: {
              user: this.configService.get<string>('MAIL_USER'),
              pass: this.configService.get<string>('MAIL_PASSWORD'),
            },
          } as any);

          const emailData = await transporter.sendMail({
            to: sendToData.email,
            from: this.configService.get<string>('MAIL_FROM'),
            subject: 'Se requiere su firma para un documento',
            text: 'welcome',
            html: `<b>Has click <a href="${url}">aqui</a> para iniciar el proceso de firma digital.</b>`,
          });

          res.status(HttpStatus.OK).send({ data, message: 'Se creo la solicitud con exito!' });
          break;
        case 'Aliados':
          break;
        case 'Asesores externos':
          break;
        case 'Clientes':
          break;
        default:
          return;
      }
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async getDigitalSignatureRequests(res: Response, filtersDto: FiltersDto) {
    const { pageIndex, pageSize, dateFrom, dateTo, requestedBy, sendToEmail, status } = filtersDto;
    const whereClause = filtersCleaner({
      requestedBy,
      sendToEmail,
      status,
    });

    if (dateFrom && dateTo) {
      whereClause.createdAt = {
        [Op.between]: [dateFrom, dateTo],
      };
    }
    const data = await this.digitalSignatureRequestModel.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset: pageIndex * pageSize - pageSize,
      order: [['updatedAt', 'desc']],
    });
    try {
      res.status(HttpStatus.OK).send(data);
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }

  async resendDigitalSignatureRequest(res: Response, reqBody: { id: string | number }) {
    const { id } = reqBody;
    try {
      const digitalSignatureRequest = await this.digitalSignatureRequestModel.findOne({ where: { id } });

      if (!digitalSignatureRequest) {
        res.status(HttpStatus.NOT_FOUND).send({
          error: true,
          message: `No se encontro una solicitud con el id: ${id}`,
        });
      }

      // TODO reenviar correo
      const url = `${this.configService.get('NEXT_API').replace('/api', '')}/firma-digital/${digitalSignatureRequest.id}`;

      const transporter = NodeMailer.createTransport({
        host: this.configService.get<string>('MAIL_HOST'),
        post: this.configService.get<number>('MAIL_PORT'),
        secure: true,
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      } as any);

      const emailData = await transporter.sendMail({
        to: digitalSignatureRequest.sendToEmail,
        from: this.configService.get<string>('MAIL_FROM'),
        subject: 'Se requiere su firma para un documento',
        text: 'welcome',
        html: `<b>Has click <a href="${url}">aqui</a> para iniciar el proceso de firma digital.</b>`,
      });

      // TODO actualizar fecha de expiracion

      await digitalSignatureRequest.update({
        expiresAt: getFutureDateISOStringBasedOnHours(48),
      });

      res.status(HttpStatus.OK).send({
        data: digitalSignatureRequest,
        message: 'Se reenvio la solicitud con exito!',
      });
    } catch (err) {
      this.logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message: `Ocurrio un error, ${JSON.stringify(err)}`,
      });
    }
  }
}
