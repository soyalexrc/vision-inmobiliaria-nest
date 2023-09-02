import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../auth/interfaces/roles.enum";

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @Auth(Roles.admin, Roles.visionAdviser)
  create(@Body() createOwnerDto: CreateOwnerDto, @Res() res: Response) {
    return this.ownerService.create(createOwnerDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.ownerService.findAll(res);
  }

  @Get('paginated')
  findAllPaginated(@Query() paginationDto: PaginationDataDto, @Res() res: Response) {
    return this.ownerService.findAllPaginated(paginationDto, res);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.visionAdviser)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.ownerService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.visionAdviser)
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto, @Res() res: Response) {
    return this.ownerService.update(+id, updateOwnerDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.ownerService.remove(+id, res);
  }
}
