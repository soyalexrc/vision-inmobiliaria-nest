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

@ApiTags('Properties')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertiesService: PropertyService) {}

  @Post()
  @Auth(Roles.admin, Roles.visionAdviser)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Post('changeStatus')
  @Auth(Roles.admin)
  changeStatus(@Body() changeStatusDto: ChangePropertyStatusDto, @Res() res: Response) {
    return this.propertiesService.changeStatus(changeStatusDto, res);
  }

  @Get('propertyStatus/:id')
  @Auth(Roles.admin)
  getPropertyStatusHistoryById(@Param('id') id: string, @Res() res: Response) {
    return this.propertiesService.getPropertyStatusHistoryById(+id, res);
  }

  @Get('getAutomaticCode')
  getAutomaticCode(@Res() res: Response) {
    return this.propertiesService.getAutomaticCode(res);
  }

  @Get('previews')
  findAll(@Res() res: Response) {
    return this.propertiesService.findAll(res);
  }

  @Get('previews/paginated')
  getPreviews(@Res() res: Response, @Query() paginationDto: PaginationDataDto) {
    return this.propertiesService.getPreviews(res, paginationDto);
  }

  @Get('previews/byUserId/:userId')
  getPreviewsByUserId(@Res() res: Response, @Param('userId') userId: number, @Query() paginationDto: PaginationDataDto) {
    return this.propertiesService.getPreviewsByUserId(res, paginationDto, +userId);
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
