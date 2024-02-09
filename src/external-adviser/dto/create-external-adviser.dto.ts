import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateExternalAdviserDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  realStateName: string;
}
