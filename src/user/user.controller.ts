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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(Roles.admin)
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Patch('changeStatus')
  @Auth(Roles.admin)
  @ApiResponse({
    status: 201,
    description: 'User status changed',
  })
  changeStatus(@Body() changeStatusDto: ChangeStatusDto, @Res() res: Response) {
    return this.userService.changeStatus(changeStatusDto, res);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: User,
  })
  @Auth(Roles.admin)
  findAll(@Res() res: Response, @Query() paginationData: PaginationDataDto) {
    return this.userService.findAll(res, paginationData);
  }

  @Get('getAdvisers')
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: User,
  })
  findAllAdvisers(@Res() res: Response, @Query() queryData: { adviserType: string }) {
    return this.userService.findAllAdvisers(res, queryData);
  }

  @Get(':id')
  @Auth(Roles.admin)
  @ApiResponse({
    status: 200,
    description: 'Get one user',
    type: User,
  })
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.userService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin)
  @ApiResponse({
    status: 200,
    description: 'User edited',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    return this.userService.update(+id, updateUserDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    type: User,
  })
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.userService.remove(+id, res);
  }
}
