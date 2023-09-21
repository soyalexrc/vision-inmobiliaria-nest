import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Service } from './service.entity';
import { Client } from '../../client/entities/client.entity';

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

  @HasMany(() => Client)
  clients: Client[];

  @Column({ type: DataType.STRING })
  title: string;
}
