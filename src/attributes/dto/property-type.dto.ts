import { IsString } from "class-validator";

export class PropertyTypeDto {
  @IsString()
  propertyType: string;
}
