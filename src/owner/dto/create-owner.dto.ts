import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  birthdate: string;

  @IsString()
  phone: string;

  @IsBoolean()
  isInvestor: boolean;
}
