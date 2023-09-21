import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SubService } from './sub-service.entity';
import { Client } from '../../client/entities/client.entity';

@Table({ tableName: 'Service' })
export class Service extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @HasMany(() => SubService)
  subServices: SubService[];

  @HasMany(() => Client)
  clients: Client[];

  @Column({ type: DataType.STRING })
  title: string;
}
