import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SubService } from './sub-service.entity';

@Table({ tableName: 'Service' })
export class Service extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @HasMany(() => SubService)
  subServices: SubService[];

  @Column({ type: DataType.STRING })
  title: string;
}
