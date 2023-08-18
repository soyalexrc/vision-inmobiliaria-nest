import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @ApiProperty({
    description: 'User first name',
    nullable: false,
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    description: 'User last name',
    nullable: false,
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    description: 'User main phone number',
    nullable: false,
  })
  mainPhone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'User secondary phone number',
    required: false,
  })
  secondaryPhone: string;

  @IsString()
  @ApiProperty({
    description: 'User email address',
    nullable: false,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User birth date',
    nullable: false,
  })
  birthDate: string;

  @IsString()
  @ApiProperty({
    description: 'User username',
    nullable: false,
  })
  username: string;

  @IsString()
  @ApiProperty({
    description: 'User type',
    nullable: false,
  })
  userType: string;

  @IsString()
  @ApiProperty({
    description: 'User level or range',
    nullable: false,
  })
  userLevel: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    nullable: false,
  })
  password: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'User commission percentage',
    nullable: false,
  })
  userCommission: number;

  @IsBoolean()
  @ApiProperty({
    description: 'User active',
  })
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
