import { IsArray, IsInt, IsObject } from 'class-validator';

export class CreatePropertyDto {
  @IsArray()
  images: string[];

  @IsArray()
  files: string[];

  @IsArray()
  attributes: Array<any>;

  @IsInt()
  client_id: number;

  @IsInt()
  ally_id: number;

  @IsInt()
  user_id: number;

  @IsObject()
  generalInformation: any;

  @IsObject()
  locationInformation: any;

  @IsObject()
  negotiationInformation: any;

  @IsObject()
  publicationSource: any;
}
