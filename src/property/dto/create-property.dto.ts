import { IsArray, IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @IsArray()
  images: string[];

  @IsArray()
  files: string[];

  @IsArray()
  attributes: Array<any>;

  @IsArray()
  distribution: Array<any>;

  @IsArray()
  adjacencies: Array<any>;

  @IsArray()
  services: Array<any>;

  @IsArray()
  furnishedAreas: Array<any>;

  @IsArray()
  equipment: Array<any>;

  @IsInt()
  @IsOptional()
  client_id: number;

  @IsString()
  publicationTitle: string;

  @IsInt()
  @IsOptional()
  owner_id: number | null;

  @IsInt()
  @IsOptional()
  external_adviser_id: number | null;

  @IsInt()
  @IsOptional()
  ally_id: number | null;

  @IsInt()
  user_id: number;

  @IsObject()
  generalInformation: any;

  @IsObject()
  locationInformation: any;

  @IsObject()
  documentsInformation: any;

  @IsObject()
  negotiationInformation: any;
}
