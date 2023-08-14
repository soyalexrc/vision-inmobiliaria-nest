import { IsInt, IsString } from 'class-validator';

export class CreateExternalAdviserDto {
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
