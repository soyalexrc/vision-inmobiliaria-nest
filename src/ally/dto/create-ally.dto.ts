import { IsString } from 'class-validator';

export class CreateAllyDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  birthDate: string;
}
