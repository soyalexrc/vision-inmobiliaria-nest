import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Res, Query } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from '../auth/decorators/get-user.decorator';
// import { User } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';
import { Response } from 'express';
import { PaginationDataDto } from '../common/dto/pagination-data.dto';
import { CreateTemporalTransactionDto } from './dto/create-temporal-transaction.dto';

@ApiTags('Cash Flow')
@Controller('cashflow')
export class CashflowController {
  constructor(private readonly cashflowService: CashflowService) {}

  @Post()
  @Auth(Roles.admin, Roles.serviceManager)
  create(@Body() createCashflowDto: CreateCashflowDto, @Res() res: Response) {
    return this.cashflowService.create(createCashflowDto, res);
  }

  @Post('temporalTransaction')
  @Auth(Roles.admin, Roles.serviceManager)
  createTemporalTransaction(@Body() createTemporalTransactionDto: CreateTemporalTransactionDto, @Res() res: Response) {
    return this.cashflowService.createTemporalTransaction(createTemporalTransactionDto, res);
  }

  @Get()
  @Auth(Roles.admin, Roles.serviceManager)
  findAll(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.cashflowService.findAll(paginationData, res);
  }
  @Get('getTemporalTransactions')
  @Auth(Roles.admin, Roles.serviceManager)
  getTemporalTransactions(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.cashflowService.getTemporalTransactions(paginationData, res);
  }

  @Get('getTotals')
  @Auth(Roles.admin, Roles.serviceManager)
  getTotals(@Res() res: Response) {
    return this.cashflowService.getTotals(res);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.cashflowService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  update(@Param('id') id: string, @Body() updateCashflowDto: UpdateCashflowDto, @Res() res: Response) {
    return this.cashflowService.update(+id, updateCashflowDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin, Roles.serviceManager)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.cashflowService.remove(+id, res);
  }
}
