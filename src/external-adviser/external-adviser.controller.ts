import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { ExternalAdviserService } from './external-adviser.service';
import { CreateExternalAdviserDto } from './dto/create-external-adviser.dto';
import { UpdateExternalAdviserDto } from './dto/update-external-adviser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';

@ApiTags('External Adviser')
@Controller('external-adviser')
export class ExternalAdviserController {
  constructor(private readonly externalAdviserService: ExternalAdviserService) {}

  @Post()
  create(@Body() createExternalAdviserDto: CreateExternalAdviserDto, @Res() res: Response) {
    return this.externalAdviserService.create(createExternalAdviserDto, res);
  }

  @Get()
  findAll(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.externalAdviserService.findAll(paginationData, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.externalAdviserService.findOne(+id, res);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExternalAdviserDto: UpdateExternalAdviserDto, @Res() res: Response) {
    return this.externalAdviserService.update(+id, updateExternalAdviserDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.externalAdviserService.remove(+id, res);
  }
}
