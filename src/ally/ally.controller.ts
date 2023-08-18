import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { AllyService } from './ally.service';
import { CreateAllyDto } from './dto/create-ally.dto';
import { UpdateAllyDto } from './dto/update-ally.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';

@ApiTags('Allies')
@Controller('ally')
export class AllyController {
  constructor(private readonly allyService: AllyService) {}

  @Post()
  create(@Body() createAllyDto: CreateAllyDto, @Res() res: Response) {
    return this.allyService.create(createAllyDto, res);
  }

  @Get()
  findAll(@Res() res: Response, @Query() paginationData: PaginationDataDto) {
    return this.allyService.findAll(res, paginationData);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.allyService.findOne(+id, res);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAllyDto: UpdateAllyDto, @Res() res: Response) {
    return this.allyService.update(+id, updateAllyDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.allyService.remove(+id, res);
  }
}
