import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CashFlow } from './cashflow.entity';

@Table({ tableName: 'CashFlowProperty' })
export class CashflowProperty extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  location: string;

  @HasMany(() => CashFlow)
  cashflows: CashFlow[];
}
