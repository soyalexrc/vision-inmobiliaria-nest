import { PartialType } from '@nestjs/mapped-types';
import { CreateAllyDto } from './create-ally.dto';

export class UpdateAllyDto extends PartialType(CreateAllyDto) {}
