import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { AllyService } from './ally.service';
import { CreateAllyDto } from './dto/create-ally.dto';
import { UpdateAllyDto } from './dto/update-ally.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';

@Controller('ally')
export class AllyController {
  constructor(private readonly allyService: AllyService) {}

  @Post()
  @Auth(Roles.admin, Roles.serviceManager, Roles.visionAdviser, Roles.operativeAssistant)
  create(@Body() createAllyDto: CreateAllyDto, @Res() res: Response) {
    return this.allyService.create(createAllyDto, res);
  }

  @Get()
  @Auth(Roles.admin, Roles.serviceManager, Roles.visionAdviser, Roles.operativeAssistant)
  findAll(@Res() res: Response) {
    return this.allyService.findAll(res);
  }
  @Get('paginated')
  @Auth(Roles.admin, Roles.serviceManager)
  findAllPaginated(@Res() res: Response, @Query() paginationData: PaginationDataDto) {
    return this.allyService.findAllPaginated(res, paginationData);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.allyService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  update(@Param('id') id: string, @Body() updateAllyDto: UpdateAllyDto, @Res() res: Response) {
    return this.allyService.update(+id, updateAllyDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.allyService.remove(+id, res);
  }
}
