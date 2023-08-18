import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/interfaces/roles.enum';

@ApiTags('Cash Flow')
@Controller('cashflow')
export class CashflowController {
  constructor(private readonly cashflowService: CashflowService) {}

  @Post()
  create(@Body() createCashflowDto: CreateCashflowDto) {
    return this.cashflowService.create(createCashflowDto);
  }

  @Get()
  @Auth(Roles.visionAdviser)
  findAll() {
    return this.cashflowService.findAll();
  }
  @Get('getTemporalTransactions')
  getTemporalTransactions() {
    return this.cashflowService.getTemporalTransactions();
  }

  @Get('getTotals')
  getTotals() {
    return this.cashflowService.getTotals();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashflowService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCashflowDto: UpdateCashflowDto) {
    return this.cashflowService.update(+id, updateCashflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashflowService.remove(+id);
  }
}
