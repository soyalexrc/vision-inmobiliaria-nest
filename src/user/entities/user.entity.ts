import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CashFlow } from '../../cashflow/entities/cashflow.entity';
import { Property } from '../../property/entities/property.entity';
import { Client } from '../../client/entities/client.entity';

@Table({ tableName: 'User' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.STRING })
  mainPhone: string;

  @Column({ type: DataType.STRING })
  secondaryPhone: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  corporateEmail: string;

  @Column({ type: DataType.DATE, allowNull: true })
  birthDate: Date;

  @Column({ type: DataType.DATE })
  joinDate: Date;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  userType: string;

  @Column({ type: DataType.STRING })
  userLevel: string;

  @Column({ type: DataType.STRING })
  userCommission: string;

  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @Column({ type: DataType.STRING })
  facebook: string;

  @Column({ type: DataType.STRING })
  instagram: string;

  @Column({ type: DataType.STRING })
  twitter: string;

  @Column({ type: DataType.STRING })
  youtube: string;

  @Column({ type: DataType.STRING })
  tiktok: string;

  @Column({ type: DataType.STRING })
  city: string;

  @Column({ type: DataType.STRING })
  state: string;

  @Column({ type: DataType.TEXT })
  address: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING })
  profession: string;

  @Column({ type: DataType.STRING })
  company: string;

  @HasMany(() => CashFlow)
  cashflows: CashFlow[];

  @HasMany(() => Property)
  properties: Property[];

  @HasMany(() => Client)
  clients: Client[];
}
