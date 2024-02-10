import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  ci: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  birthdate: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isInvestor: boolean;
}
