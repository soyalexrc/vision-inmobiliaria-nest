import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ErrorModule } from './error/error.module';

@Module({
  imports: [FilesModule, ErrorModule],
})
export class CommonModule {}
