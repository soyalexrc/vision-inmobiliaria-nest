import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from "@nestjs/common";
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Response } from 'express';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Res() res: Response) {
    return this.serviceService.create(createServiceDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.serviceService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Get('getSubServicesByServiceId/:id')
  getSubServicesByServiceId(@Res() res: Response, @Param('id') serviceId: number | string) {
    return this.serviceService.getSubServicesByServiceId(res, serviceId);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto, @Res() res: Response) {
    return this.serviceService.update(+id, updateServiceDto, res);
  }

  @Delete('deleteSubService/:id')
  deleteSubService(@Param('id') id: string, @Res() res: Response) {
    return this.serviceService.deleteSubService(+id, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
