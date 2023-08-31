import { IsString } from 'class-validator';

export class CreateTemporalIdDto {
  @IsString()
  temporalId: string;
}
