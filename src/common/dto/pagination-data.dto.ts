import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDataDto {
  @IsInt()
  @Type(() => Number)
  pageIndex: number;

  @IsInt()
  @Type(() => Number)
  pageSize: number;
}
