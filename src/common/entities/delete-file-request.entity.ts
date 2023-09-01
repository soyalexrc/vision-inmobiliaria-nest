import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'DeleteFileRequest', updatedAt: false })
export class DeleteFileRequest extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  path: string;

  @Column({ type: DataType.STRING })
  user: string;

  @Column({ type: DataType.STRING })
  type: string;
}
