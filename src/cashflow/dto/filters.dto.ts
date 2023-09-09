import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltersDto {
  @IsInt()
  @Type(() => Number)
  pageIndex: number;

  @IsInt()
  @Type(() => Number)
  pageSize: number;

  @IsString()
  transactionType: string;

  @IsString()
  currency: string;

  @IsString()
  wayToPay: string;

  @IsString()
  entity: string;

  @IsString()
  service: string;

  @IsString()
  dateFrom: string;

  @IsString()
  dateTo: string;
}
