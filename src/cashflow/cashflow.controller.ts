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
import { FiltersDto } from './dto/filters.dto';

@Controller('cashflow')
export class CashflowController {
  constructor(private readonly cashflowService: CashflowService) {}

  @Post()
  @Auth(Roles.admin, Roles.companyManager)
  create(@Body() createCashflowDto: CreateCashflowDto, @Res() res: Response) {
    return this.cashflowService.create(createCashflowDto, res);
  }

  @Post('createPerson')
  @Auth(Roles.admin, Roles.companyManager)
  createPerson(@Body() personData: { name: string }, @Res() res: Response) {
    return this.cashflowService.createPerson(personData, res);
  }
  @Post('createProperty')
  @Auth(Roles.admin, Roles.companyManager)
  createProperty(@Body() propertyData: { name: string; location: string }, @Res() res: Response) {
    return this.cashflowService.createProperty(propertyData, res);
  }

  @Post('temporalTransaction')
  @Auth(Roles.admin, Roles.companyManager)
  createTemporalTransaction(@Body() createTemporalTransactionDto: CreateTemporalTransactionDto, @Res() res: Response) {
    return this.cashflowService.createTemporalTransaction(createTemporalTransactionDto, res);
  }

  @Get()
  @Auth(Roles.admin, Roles.companyManager)
  findAll(@Query() filtersDto: FiltersDto, @Res() res: Response) {
    return this.cashflowService.findAll(filtersDto, res);
  }
  @Get('getCloseCashFlows')
  @Auth(Roles.admin, Roles.companyManager)
  findAllCloseCashFlows(@Query() filtersDto: FiltersDto, @Res() res: Response) {
    return this.cashflowService.findAllCloseCashFlows(filtersDto, res);
  }
  @Get('getTemporalTransactions')
  @Auth(Roles.admin, Roles.companyManager)
  getTemporalTransactions(@Query() paginationData: PaginationDataDto, @Res() res: Response) {
    return this.cashflowService.getTemporalTransactions(paginationData, res);
  }

  @Get('getTotals')
  @Auth(Roles.admin, Roles.companyManager)
  getTotals(@Res() res: Response, @Query() filtersDto: FiltersDto) {
    return this.cashflowService.getTotals(res, filtersDto);
  }

  @Get('getTotalAvailable')
  @Auth(Roles.admin, Roles.companyManager)
  getTotalAvailable(@Res() res: Response, @Query() filtersDto: FiltersDto) {
    return this.cashflowService.getTotalAvailable(res, filtersDto);
  }

  @Get('getTotalAvailableByEntities')
  @Auth(Roles.admin, Roles.companyManager)
  getTotalAvailableByEntities(@Res() res: Response, @Query() filtersDto: FiltersDto) {
    return this.cashflowService.getTotalAvailableByEntities(res, filtersDto);
  }

  @Get('getPeople')
  @Auth(Roles.admin, Roles.companyManager)
  findAllPeople(@Res() res: Response) {
    return this.cashflowService.findAllPeople(res);
  }
  @Get('getProperties')
  @Auth(Roles.admin, Roles.companyManager)
  findAllProperties(@Res() res: Response) {
    return this.cashflowService.findAllProperties(res);
  }

  @Get(':id')
  @Auth(Roles.admin, Roles.companyManager)
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.cashflowService.findOne(+id, res);
  }

  @Put(':id')
  @Auth(Roles.admin, Roles.companyManager)
  update(@Param('id') id: string, @Body() updateCashflowDto: UpdateCashflowDto, @Res() res: Response) {
    return this.cashflowService.update(+id, updateCashflowDto, res);
  }

  @Delete(':id')
  @Auth(Roles.admin)
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.cashflowService.remove(+id, res);
  }
}
