import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

@Injectable()
export class FilesService {
  getStaticPropertyImage(code: string, imageName: string) {
    const path = join(__dirname, `../../../static/properties/${code}/images`, imageName);

    if (!fileExistsSync(path)) throw new BadRequestException('No se econtro el archivo con el nombre ' + imageName);

    return path;
  }
}
