import { IsNumber, IsString } from "class-validator";

export class UploadFolderDataDto {
  @IsString()
  folderName: string;

  @IsNumber()
  id: number;
}
