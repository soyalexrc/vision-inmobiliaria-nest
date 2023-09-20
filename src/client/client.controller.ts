import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';
import { FiltersDto } from '../cashflow/dto/filters.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager)
  create(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
    return this.clientService.create(createClientDto, res);
  }

  @Post('changeStatus')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager)
  changeStatus(@Body() changeStatusDto: { status: string; id: number }, @Res() res: Response) {
    return this.clientService.changeStatus(changeStatusDto, res);
  }

  @Get()
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager)
  findAll(@Res() res: Response) {
    return this.clientService.findAll(res);
  }

  @Get('getPreviews')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager)
  getPreviews(@Res() res: Response, @Query() filtersDto: FiltersDto) {
    return this.clientService.getPreviews(res, filtersDto);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.clientService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Res() res: Response) {
    return this.clientService.update(+id, updateClientDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.clientService.remove(+id, res);
  }
}
