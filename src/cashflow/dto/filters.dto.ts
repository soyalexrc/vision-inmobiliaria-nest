import { IsInt, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class FiltersDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pageIndex: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  pageSize: number;

  @IsString()
  @IsOptional()
  transactionType: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  wayToPay: string;

  @IsString()
  @IsOptional()
  entity: string;

  @IsString()
  @IsOptional()
  service: string;

  @IsString()
  @IsOptional()
  dateFrom: string;

  @IsString()
  @IsOptional()
  dateTo: string;
}
