import { IsString } from "class-validator";

export class CreateAppConfigDto {
  @IsString()
  configCode: string;

  @IsString()
  configValue: string;

  @IsString()
  configDescription: string;
}
