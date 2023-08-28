import { IsInt, IsString } from 'class-validator';

export class ChangePropertyStatusDto {
  @IsInt()
  property_id: number;

  @IsString()
  status: string;

  @IsString()
  username: string;

  @IsString()
  comments: string;
}
