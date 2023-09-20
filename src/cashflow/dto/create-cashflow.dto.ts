import { IsString, IsOptional, IsInt, IsBoolean, IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCashflowDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  property_id: number | null;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  client_id: number | null;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  user_id: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  owner_id: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  cashflow_person_id: number;

  @IsString()
  date: string;

  @IsString()
  internalProperty: string;

  @IsString()
  @IsOptional()
  person: string;

  @IsString()
  month: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsBoolean()
  isTemporalTransaction = false;

  // @IsBoolean()
  // @IsOptional()
  // @Type(() => Boolean)
  // @ApiProperty({
  //   description: 'Canon information',
  //   required: false,
  // })
  // canon: boolean;
  //
  // @IsBoolean()
  // @IsOptional()
  // @Type(() => Boolean)
  // @ApiProperty({
  //   description: 'Contract information',
  //   required: false,
  // })
  // contract: boolean;
  //
  // @IsBoolean()
  // @IsOptional()
  // @Type(() => Boolean)
  // @ApiProperty({
  //   description: 'Guarantee information',
  //   required: false,
  // })
  // guarantee: boolean;
  //
  // @IsInt()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Type of service description',
  // })
  // serviceType: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Reason for mooney transaction or small text for documentation purpose',
  // })
  // reason: string;
  //
  // @IsInt()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Service name',
  // })
  // service: string;
  //
  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Tax payer information',
  // })
  // taxPayer: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Amount (whether is income or outcome)',
  // })
  // amount: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Currency',
  //   examples: ['Bs', '$', '€'],
  // })
  // currency: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Method of payment',
  //   examples: ['Zelle', 'Pago movil', 'Transferencia', 'Efectivo'],
  // })
  // wayToPay: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Type of transaction',
  //   examples: ['Ingreso', 'Egreso', 'Cuenta por pagar', 'Cuenta por cobrar'],
  // })
  // transactionType: string;
  //
  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Total due amount',
  //   required: false,
  // })
  // totalDue: string;
  //
  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Total incomeByThird',
  //   required: false,
  // })
  // incomeByThird: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Total due amount (when is not income or outcome)',
  //   examples: [
  //     'Banco Nacional de Credito',
  //     'Banesco Panama',
  //     'Banesco Venezuela',
  //     'Banco Nacional de Terceros',
  //     'Oficina Paseo la Granja',
  //     'Tesoreria',
  //     'Oficina San Carlos',
  //   ],
  // })
  // entity: string;
  //
  // @IsString()
  // @ApiProperty({
  //   description: 'Pending to collect amount',
  //   required: false,
  // })
  // pendingToCollect: string;
  //
  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Observations',
  //   required: false,
  // })
  // observation: string;
  //
  // @IsOptional()
  // @IsObject()
  // propertyJson: any;

  @IsArray()
  payments: any[];
}
