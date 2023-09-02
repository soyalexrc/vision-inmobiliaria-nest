import { IsString } from 'class-validator';

export class MoveFileOrFolderDto {
  @IsString()
  pathFrom: string;

  @IsString()
  pathTo: string;
}
