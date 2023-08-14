import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    nullable: false,
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
  @ApiProperty({
    description: 'User commission percentage',
    nullable: false,
  })
  userCommission: number;
}
