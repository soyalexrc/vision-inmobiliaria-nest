import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePropertyAttributeDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsInt()
  property_id: number;

  @IsInt()
  attribute_id: number;

  @IsString()
  value: string;
}
