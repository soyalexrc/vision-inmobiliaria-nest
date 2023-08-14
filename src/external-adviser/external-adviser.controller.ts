import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Put
} from "@nestjs/common";
import { ExternalAdviserService } from './external-adviser.service';
import { CreateExternalAdviserDto } from './dto/create-external-adviser.dto';
import { UpdateExternalAdviserDto } from './dto/update-external-adviser.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('External Adviser')
@Controller('external-adviser')
export class ExternalAdviserController {
  constructor(
    private readonly externalAdviserService: ExternalAdviserService,
  ) {}

  @Post()
  create(@Body() createExternalAdviserDto: CreateExternalAdviserDto) {
    return this.externalAdviserService.create(createExternalAdviserDto);
  }

  @Get()
  findAll() {
    return this.externalAdviserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externalAdviserService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExternalAdviserDto: UpdateExternalAdviserDto,
  ) {
    return this.externalAdviserService.update(+id, updateExternalAdviserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalAdviserService.remove(+id);
  }
}
