import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../auth/interfaces/roles.enum";

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Auth(Roles.admin)
  create(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
    return this.clientService.create(createClientDto, res);
  }

  @Get()
  findAll(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.clientService.findAll(paginationData, res);
  }

  @Get('getPreviews')
  getPreviews(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.clientService.getPreviews(paginationData, res);
  }

  @Get(':id')
  @Auth(Roles.admin)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.clientService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Res() res: Response) {
    return this.clientService.update(+id, updateClientDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.clientService.remove(+id, res);
  }
}
