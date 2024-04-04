import { IsString } from "class-validator";

export class UploadFileDto {
  @IsString()
  isPropertyFile: string;

  @IsString()
  path: string;

  @IsString()
  parent_id: string;
}
