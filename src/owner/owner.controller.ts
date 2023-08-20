import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import {Response} from "express";
import {PaginationDataDto} from "../common/dto/pagination-data.dto";

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto, @Res() res: Response) {
    return this.ownerService.create(createOwnerDto, res);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDataDto, @Res() res: Response) {
    return this.ownerService.findAll(paginationDto, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.ownerService.findOne(+id, res);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto, @Res() res: Response) {
    return this.ownerService.update(+id, updateOwnerDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.ownerService.remove(+id, res);
  }
}
