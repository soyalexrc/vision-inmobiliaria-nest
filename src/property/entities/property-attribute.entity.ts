import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './property.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';

@Table({ tableName: 'Property_Attribute', createdAt: false, updatedAt: false })
export class PropertyAttribute extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER })
  property_id: number;

  @Column({ type: DataType.STRING })
  value: string;

  @ForeignKey(() => Attribute)
  @Column({ type: DataType.INTEGER })
  attribute_id: number;
}
