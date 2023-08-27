import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';

@ApiTags('Properties')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertiesService: PropertyService) {}

  @Post()
  @Auth(Roles.admin, Roles.visionAdviser)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get('previews')
  getPreviews(@Res() res: Response, @Query() paginationDto: PaginationDataDto) {
    return this.propertiesService.getPreviews(res, paginationDto);
  }

  @Get('getAllGeneralInformation')
  getAllGeneralInformation() {
    return this.propertiesService.getAllGeneralInformation();
  }

  @Get('getAllLocationInformation')
  getAllLocationInformation() {
    return this.propertiesService.getAllLocationInformation();
  }

  @Get('getAllNegotiationInformation')
  getAllNegotiationInformation() {
    return this.propertiesService.getAllNegotiationInformation();
  }

  @Get('getAllPublicationSource')
  getAllPublicationSource() {
    return this.propertiesService.getAllPublicationSource();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.propertiesService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.visionAdviser)
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
