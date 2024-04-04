import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: 'File' })
export class File extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  extension: string;

  @Column({ type: DataType.BIGINT })
  size: number;

  @Column({ type: DataType.STRING })
  path: string;

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER })
  parent_id: number;
}
