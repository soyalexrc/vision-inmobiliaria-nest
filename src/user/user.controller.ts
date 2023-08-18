import { Controller, Get, Post, Body, Param, Delete, Put, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: User,
  })
  findAll(@Res() res: Response, @Query() paginationData: PaginationDataDto) {
    return this.userService.findAll(res, paginationData);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get one user',
    type: User,
  })
  findOne(@Param('id') id: string, @Res() res: Response,) {
    return this.userService.findOne(+id, res);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'User edited',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return this.userService.update(+id, updateUserDto, res);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    type: User,
  })
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.userService.remove(+id, res);
  }
}
