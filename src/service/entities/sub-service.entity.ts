import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Service } from './service.entity';

@Table({ tableName: 'SubService' })
export class SubService extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Service)
  service_id: number;

  @BelongsTo(() => Service)
  service: Service;

  @Column({ type: DataType.STRING })
  title: string;
}
