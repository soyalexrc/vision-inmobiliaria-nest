import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { ExternalAdviserService } from './external-adviser.service';
import { CreateExternalAdviserDto } from './dto/create-external-adviser.dto';
import { UpdateExternalAdviserDto } from './dto/update-external-adviser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';

@Controller('external-adviser')
export class ExternalAdviserController {
  constructor(private readonly externalAdviserService: ExternalAdviserService) {}

  @Post()
  @Auth(Roles.admin, Roles.serviceManager)
  create(@Body() createExternalAdviserDto: CreateExternalAdviserDto, @Res() res: Response) {
    return this.externalAdviserService.create(createExternalAdviserDto, res);
  }

  @Get('')
  @Auth(Roles.admin, Roles.serviceManager, Roles.visionAdviser)
  findAll(@Res() res: Response) {
    return this.externalAdviserService.findAll(res);
  }

  @Get('paginated')
  @Auth(Roles.admin, Roles.serviceManager)
  findAllPaginated(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.externalAdviserService.findAllPaginated(paginationData, res);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.externalAdviserService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  update(@Param('id') id: string, @Body() updateExternalAdviserDto: UpdateExternalAdviserDto, @Res() res: Response) {
    return this.externalAdviserService.update(+id, updateExternalAdviserDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.externalAdviserService.remove(+id, res);
  }
}
