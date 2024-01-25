import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { Roles } from '../auth/interfaces/roles.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(Roles.admin, Roles.serviceManager)
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Patch('changeStatus')
  @Auth(Roles.admin, Roles.serviceManager)
  changeStatus(@Body() changeStatusDto: ChangeStatusDto, @Res() res: Response) {
    return this.userService.changeStatus(changeStatusDto, res);
  }

  @Get()
  @Auth(Roles.admin, Roles.serviceManager)
  findAll(@Res() res: Response, @Query() paginationData: PaginationDataDto) {
    return this.userService.findAll(res, paginationData);
  }

  @Get('getAdvisers')
  @Auth(Roles.admin, Roles.serviceManager, Roles.visionAdviser, Roles.operativeAssistant)
  findAllAdvisers(@Res() res: Response) {
    return this.userService.findAllAdvisers(res);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.userService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return this.userService.update(+id, updateUserDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.userService.remove(+id, res);
  }
}
