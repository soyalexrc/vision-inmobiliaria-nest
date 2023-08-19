import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { AllyService } from './ally.service';
import { CreateAllyDto } from './dto/create-ally.dto';
import { UpdateAllyDto } from './dto/update-ally.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import {Auth} from "../auth/decorators/auth.decorator";
import {Roles} from "../auth/interfaces/roles.enum";

@ApiTags('Allies')
@Controller('ally')
export class AllyController {
  constructor(private readonly allyService: AllyService) {}

  @Post()
  @Auth(Roles.admin)
  create(@Body() createAllyDto: CreateAllyDto, @Res() res: Response) {
    return this.allyService.create(createAllyDto, res);
  }

  @Get()
  findAll(@Res() res: Response, @Query() paginationData: PaginationDataDto) {
    return this.allyService.findAll(res, paginationData);
  }

  @Get(':id')
  @Auth(Roles.admin)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.allyService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin)
  update(@Param('id') id: string, @Body() updateAllyDto: UpdateAllyDto, @Res() res: Response) {
    return this.allyService.update(+id, updateAllyDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.allyService.remove(+id, res);
  }
}
