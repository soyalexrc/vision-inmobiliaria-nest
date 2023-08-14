import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { AllyService } from './ally.service';
import { CreateAllyDto } from './dto/create-ally.dto';
import { UpdateAllyDto } from './dto/update-ally.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Allies')
@Controller('ally')
export class AllyController {
  constructor(private readonly allyService: AllyService) {}

  @Post()
  create(@Body() createAllyDto: CreateAllyDto) {
    return this.allyService.create(createAllyDto);
  }

  @Get()
  findAll() {
    return this.allyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allyService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAllyDto: UpdateAllyDto) {
    return this.allyService.update(+id, updateAllyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allyService.remove(+id);
  }
}
