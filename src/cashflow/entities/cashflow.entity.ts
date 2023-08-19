import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany, HasOne,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Property } from '../../property/entities/property.entity';
import {Client} from "../../client/entities/client.entity";
import {User} from "../../user/entities/user.entity";

@Table({ tableName: 'CashFlow' })
export class CashFlow extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;


  @ForeignKey(() => Client)
  client_id: number;

  @ForeignKey(() => User)
  user_id: number

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.STRING })
  month: string;

  @Column({ type: DataType.STRING })
  transactionType: string;

  @Column({ type: DataType.STRING })
  wayToPay: string;

  @Column({ type: DataType.STRING })
  currency: string;

  @Column({ type: DataType.STRING })
  entity: string;

  @Column({ type: DataType.STRING })
  observation: string;

  @Column({ type: DataType.STRING })
  service: string;

  @Column({ type: DataType.STRING })
  serviceType: string;

  @Column({ type: DataType.STRING })
  taxPayer: string;

  @Column({ type: DataType.STRING })
  canon: string;

  @Column({ type: DataType.STRING })
  guarantee: string;

  @Column({ type: DataType.STRING })
  contract: string;

  @Column({ type: DataType.STRING })
  reason: string;

  @Column({ type: DataType.STRING })
  createdBy: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isTemporalTransaction: boolean | null;

  @Column({ type: DataType.STRING })
  temporalTransactionId: string;

  @Column({ type: DataType.STRING })
  amount: string;

  @Column({ type: DataType.STRING })
  totalDue: string;

  @Column({ type: DataType.STRING })
  pendingToCollect: string;

  @BelongsTo(() => Property)
  property: Property;

  @ForeignKey(() => Property)
  property_id: number;
}
