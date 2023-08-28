import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import * as fs from 'fs';
import * as mv from 'mv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  private readonly logger = new Logger();
  constructor(private readonly configService: ConfigService) {}
  getStaticPropertyImage(code: string, imageName: string) {
    const path = join(__dirname, `../../../static/properties/${code}/images`, imageName);
    if (!fileExistsSync(path)) throw new BadRequestException('No se econtro el archivo con el nombre ' + imageName);
    return path;
  }

  getStaticPropertyFile(code: string, fileName: string) {
    const path = join(__dirname, `../../../static/properties/${code}/files`, fileName);

    if (!fileExistsSync(path)) throw new BadRequestException('No se econtro el archivo con el nombre ' + fileName);

    return path;
  }

  uploadPropertyImage(file: Express.Multer.File, code: string, res: Response) {
    try {
      if (!file) {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: 'Asegurese de ingresar una imagen',
        });
      }

      const fileExtension = file.mimetype.split('/')[1];
      const validExtensions = ['jpg', 'png', 'jpeg', 'webp'];

      if (!validExtensions.includes(fileExtension)) {
        res.status(HttpStatus.BAD_REQUEST).send({
          error: true,
          message: `Ingrese una imagen con un formato valido (jpg, png, jpeg, webp). Formato ingresado (${fileExtension}) No valido.`,
        });
        return;
      }

      const currentPath = join(__dirname, '../../../static/temp/images', file.filename);
      const destinationPath = join(__dirname, `../../../static/properties/${code}/images`, file.filename);

      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(join(__dirname, `../../../static/properties/${code}/images`), { recursive: true });
      }

      console.log(destinationPath);

      sharp(file.path)
        .composite([
          {
            input: join(__dirname, '../../../static/watermark.png'),
            gravity: 'center',
            blend: 'over',
          },
          // {
          //   input: Buffer.from([0, 0, 0, 128]),
          //   raw: {
          //     width: 1,
          //     height: 1,
          //     channels: 4,
          //   },
          //   tile: true,
          //   blend: 'dest-in',
          // },
        ])
        .resize(800)
        .webp({ effort: 3 })
        .toFile(destinationPath, (err, info) => {
          console.log(err, file);
          if (!err) {
            const secureUrl = `${this.configService.get('HOST_API')}/files/properties/${code}/images/${file.filename}`;
            res.status(HttpStatus.OK).send({ secureUrl });
          } else {
            this.logger.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              error: true,
              message: err,
            });
          }
        });

      // mv(currentPath, destinationPath, (err) => {
      //   if (err) {
      //     throw new BadRequestException('Ocurrio un error al mover el archivo');
      //   } else {
      //     console.log('Successfully moved the file!');
      //   }
      // });
    } catch (err) {
      this.logger.error(err);
    }
  }

  uploadPropertyFile(file: Express.Multer.File, code: string, res: Response) {
    if (!file) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: true,
        message: 'Asegurese de ingresar un documento',
      });
    }

    const currentPath = join(__dirname, '../../../static/temp/files', file.filename);
    const destinationPath = join(__dirname, `../../../static/properties/${code}/files`, file.filename);
    console.log(destinationPath);
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(join(__dirname, `../../../static/properties/${code}/files`), { recursive: true });
    }

    mv(currentPath, destinationPath, (err) => {
      if (err) {
        throw new BadRequestException('Ocurrio un error al mover el archivo');
      } else {
        console.log('Successfully moved the file!');
      }
    });

    const secureUrl = `${this.configService.get('HOST_API')}/files/properties/${code}/files/${file.filename}`;

    res.status(HttpStatus.OK).send({ secureUrl });
  }

  removePropertyImage(fileName: string, code: string, res: Response) {
    const locationPath = join(__dirname, `../../../static/properties/${code}/images`, fileName);

    if (!locationPath) {
      res.status(HttpStatus.NOT_FOUND).send({
        error: true,
        message: 'No se encontro la imagen en el directorio de alamacenaje...',
      });
    }

    fs.rmSync(locationPath, { recursive: true });

    res.status(HttpStatus.OK).send({
      data: {},
      message: 'Se elimino la imagen con exito!',
    });
  }
  removePropertyFile(fileName: string, code: string, res: Response) {
    const locationPath = join(__dirname, `../../../static/properties/${code}/files`, fileName);

    if (!locationPath) {
      res.status(HttpStatus.NOT_FOUND).send({
        error: true,
        message: 'No se encontro el documento en el directorio de alamacenaje...',
      });
    }

    fs.rmSync(locationPath, { recursive: true });

    res.status(HttpStatus.OK).send({
      data: {},
      message: 'Se elimino el documento con exito!',
    });
  }
}
