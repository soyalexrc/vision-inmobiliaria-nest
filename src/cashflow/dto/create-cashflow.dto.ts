import { IsString, IsOptional, IsInt, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";

export class CreateCashflowDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Property id',
    required: false,
  })
  property_id: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Client id',
    required: false,
  })
  client: number;

  @IsString()
  @ApiProperty({
    description: 'Date of register',
  })
  date: string;

  @IsString()
  @ApiProperty({
    description: 'Month of register',
  })
  month: string;


  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'property location',
    required: false,
  })
  location: string;

  @IsBoolean()
  @ApiProperty({
    description:
      'Temporal transaction means that it would be considered for totals calculation (if true), else it  goes to  "resumen de operaciones" ',
  })
  isTemporalTransaction = false;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Canon information',
    required: false,
  })
  canon: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contract information',
    required: false,
  })
  contract: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Guarantee information',
    required: false,
  })
  guarantee: string;

  @IsString()
  @ApiProperty({
    description: 'Type of service description',
  })
  typeOfService: string;

  @IsString()
  @ApiProperty({
    description: 'Reason for mooney transaction or small text for documentation purpose',
  })
  reason: string;

  @IsString()
  @ApiProperty({
    description: 'Service name',
  })
  service: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Tax payer information',
  })
  taxPayer: string;

  @IsString()
  @ApiProperty({
    description: 'Amount (whether is income or outcome)',
  })
  amount: string;

  @IsString()
  @ApiProperty({
    description: 'Currency',
    examples: ['Bs', '$', '€'],
  })
  currency: string;

  @IsString()
  @ApiProperty({
    description: 'Method of payment',
    examples: ['Zelle', 'Pago movil', 'Transferencia', 'Efectivo'],
  })
  wayToPay: string;

  @IsString()
  @ApiProperty({
    description: 'Type of transaction',
    examples: ['Ingreso', 'Egreso', 'Cuenta por pagar', 'Cuenta por cobrar'],
  })
  transactionType: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Total due amount',
    required: false,
  })
  totalDue: string;

  @IsString()
  @ApiProperty({
    description: 'Total due amount (when is not income or outcome)',
    examples: [
      'Banco Nacional de Credito',
      'Banesco Panama',
      'Banesco Venezuela',
      'Banco Nacional de Terceros',
      'Oficina Paseo la Granja',
      'Tesoreria',
      'Oficina San Carlos',
    ],
  })
  entity: string;

  @IsString()
  @ApiProperty({
    description: 'Pending to collect amount',
    required: false,
  })
  pendingToCollect: string;

  @IsString()
  @ApiProperty({
    description: 'Observations',
    required: false,
  })
  observation: string;

  @IsOptional()
  @IsObject()
  propertyJson: any;
}
