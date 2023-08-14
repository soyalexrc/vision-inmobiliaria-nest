import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'CashFlow' })
export class CashFlow extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  client: string;

  @Column({ type: DataType.STRING })
  property: string;

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

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  isTemporalTransaction: boolean | null;

  @Column({ type: DataType.STRING })
  amount: string;

  @Column({ type: DataType.STRING })
  totalDue: string;

  @Column({ type: DataType.STRING })
  pendingToCollect: string;
}
