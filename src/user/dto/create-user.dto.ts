import { IsString, IsInt, IsOptional, IsBoolean, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  mainPhone: string;

  @IsString()
  @IsOptional()
  secondaryPhone: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsEmail()
  corporateEmail: string;

  @IsString()
  @IsOptional()
  birthDate: string;

  @IsString()
  joinDate: string;

  @IsString()
  username: string;

  @IsString()
  userType: string;

  @IsString()
  userLevel: string;

  @IsString()
  password: string;

  @IsInt()
  @IsOptional()
  userCommission: number;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  facebook: string;

  @IsString()
  instagram: string;

  @IsString()
  twitter: string;

  @IsString()
  youtube: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  tiktok: string;

  @IsString()
  profession: string;

  @IsString()
  image: string;

  @IsString()
  company: string;
}
