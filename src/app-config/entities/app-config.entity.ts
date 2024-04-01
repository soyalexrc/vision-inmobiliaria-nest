import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: 'AppConfig' })
export class AppConfig extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  configCode: string;

  @Column({ type: DataType.STRING })
  configValue: string;

  @Column({ type: DataType.STRING })
  configDescription: string;
}
