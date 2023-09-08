import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  serviceTitle: string;

  @IsArray()
  subServices: any[];

  @IsInt()
  @IsOptional()
  serviceId: number | null;
}
