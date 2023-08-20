import { IsArray, IsInt, IsObject, IsOptional } from "class-validator";
import {IsNull} from "sequelize-typescript";

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
  owner_id: number;

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
