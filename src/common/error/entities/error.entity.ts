import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: 'Error' })
export class Error extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING })
  moduleFrom: string;

  @Column({ type: DataType.STRING })
  action: string;

  @Column({ type: DataType.STRING })
  method: string;
}
