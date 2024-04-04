import { IsString } from "class-validator";

export class ErrorDto {
  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsString()
  moduleFrom: string;

  @IsString()
  action: string;

  @IsString()
  method: string;
}
