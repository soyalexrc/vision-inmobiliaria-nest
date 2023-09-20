import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTemporalTransactionDto {
  @IsString()
  reason: string;

  @IsString()
  createdBy: string;

  @IsString()
  amount: string;

  @IsString()
  currency: string;

  @IsString()
  wayToPay: string;

  @IsString()
  entityFrom: string;

  @IsString()
  entityTo: string;

  @IsString()
  date: string;

  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsString()
  month: string;
}
