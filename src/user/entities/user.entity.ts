import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from '../../property/entities/property.entity';

@Table({ tableName: 'User' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  // TODO documentar demas schemas
  @ApiProperty({
    example: 1,
    description: 'User ID',
    default: 0,
    uniqueItems: true,
  })
  id: number;

  @HasMany(() => Property)
  properties: Property[];

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: 'Pedro',
    description: 'User first name',
    default: '',
  })
  firstName: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: 'Perez',
    description: 'User last name',
    default: '',
  })
  lastName: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: '+58 424 432 2345',
    description: 'User main phone number',
    default: '',
  })
  mainPhone: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: '+58 424 432 2345',
    description: 'User secondary phone number',
    default: '',
  })
  secondaryPhone: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: '1234',
    description: 'User Password (should be encrypted)',
    default: '',
  })
  password: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: 'sample@sample.com',
    description: 'User email address',
    default: '',
  })
  email: string;

  @Column({ type: DataType.DATE })
  @ApiProperty({
    example: '1998-05-22T05:00:00.000Z',
    description: 'User birthdate',
    default: '',
  })
  birthDate: Date;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    example: 'nombreDeUsuario',
    description: 'User username',
    default: '',
  })
  username: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    examples: ['Asesor inmobiliario vision', 'Administrador', 'Coordinador de servicios', 'Asesor inmobiliario externo'],
    example: 'Asesor inmobiliario vision',
    description: 'User type',
    default: '',
  })
  userType: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    examples: ['Asesor emprendedor', 'Asesor destacado', 'Asesor estrella', 'Asesor diamante'],
    example: 'Asesor emprendedor',
    description: 'User level or range',
    default: '',
  })
  userLevel: string;

  @Column({ type: DataType.STRING })
  @ApiProperty({
    examples: ['80', '70', '60', '50'],
    example: '80',
    description: 'User commission based on range',
    default: '',
  })
  userCommission: string;
}
