import { PartialType } from '@nestjs/mapped-types';
import { CreateExternalAdviserDto } from './create-external-adviser.dto';

export class UpdateExternalAdviserDto extends PartialType(CreateExternalAdviserDto) {}
