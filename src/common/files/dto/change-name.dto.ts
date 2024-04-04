import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ChangeNameDto {
  @IsString()
  newName: string;

  @IsBoolean()
  isFile: boolean;

  @IsNumber()
  id: number;
}
