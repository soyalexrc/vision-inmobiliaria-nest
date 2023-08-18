import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTemporalTransactionDto {
  @IsString()
  @ApiProperty({
    description: 'Reason for mooney transaction or small text for documentation purpose',
  })
  reason: string;

  @IsString()
  createdBy: string;

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
  entityFrom: string;

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
  entityTo: string;
}
