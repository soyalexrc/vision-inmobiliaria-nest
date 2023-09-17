import { IsInt, IsOptional, IsString } from 'class-validator';
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
  serviceType: string;

  @IsString()
  @IsOptional()
  dateFrom: string;

  @IsString()
  @IsOptional()
  dateTo: string;

  @IsString()
  @IsOptional()
  property_id: string;

  @IsString()
  @IsOptional()
  owner_id: string;

  @IsString()
  @IsOptional()
  client_id: string;

  @IsString()
  @IsOptional()
  person: string;

  @IsString()
  @IsOptional()
  operationType: string;

  @IsString()
  @IsOptional()
  contactFrom: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  municipality: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  propertyType: string;
}
