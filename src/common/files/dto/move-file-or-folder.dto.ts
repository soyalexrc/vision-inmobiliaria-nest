import { IsNumber } from 'class-validator';

export class MoveFileOrFolderDto {
  @IsNumber()
  idFrom: number;

  @IsNumber()
  idTo: number;
}
