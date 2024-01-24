import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { ChangePropertyStatusDto } from './dto/change-property-status.dto';
import { FiltersDto } from '../cashflow/dto/filters.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertiesService: PropertyService) {}

  @Post()
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager, Roles.operativeAssistant)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Post('changeStatus')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager, Roles.operativeAssistant)
  changeStatus(@Body() changeStatusDto: ChangePropertyStatusDto, @Res() res: Response) {
    return this.propertiesService.changeStatus(changeStatusDto, res);
  }

  @Get('propertyStatus/:id')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager, Roles.operativeAssistant)
  getPropertyStatusHistoryById(@Param('id') id: string, @Res() res: Response) {
    return this.propertiesService.getPropertyStatusHistoryById(+id, res);
  }

  @Get('getAutomaticCode')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager, Roles.operativeAssistant)
  getAutomaticCode(@Res() res: Response) {
    return this.propertiesService.getAutomaticCode(res);
  }

  @Get('previews')
  findAll(@Res() res: Response) {
    return this.propertiesService.findAll(res);
  }

  @Get('previews/paginated')
  getPreviews(@Res() res: Response, @Query() filtersDto: FiltersDto) {
    return this.propertiesService.getPreviews(res, filtersDto);
  }

  @Get('previews/byUserId/:userId')
  @Auth(Roles.visionAdviser)
  getPreviewsByUserId(@Res() res: Response, @Param('userId') userId: number, @Query() paginationDto: PaginationDataDto) {
    return this.propertiesService.getPreviewsByUserId(res, paginationDto, +userId);
  }

  @Get('getBySlug/:slug')
  getBySlug(@Param('slug') slug: string, @Res() res: Response) {
    return this.propertiesService.getBySlug(slug, res);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager, Roles.operativeAssistant)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.propertiesService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.visionAdviser, Roles.serviceManager, Roles.operativeAssistant)
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
