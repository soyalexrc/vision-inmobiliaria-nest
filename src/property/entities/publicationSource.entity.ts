import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './property.entity';

@Table({ tableName: 'PublicationSource' })
export class PublicationSource extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Property)
  @Column
  property_id: number;

  @BelongsTo(() => Property)
  property: Property;

  @Column({ type: DataType.BOOLEAN })
  instagram: boolean;

  @Column({ type: DataType.BOOLEAN })
  facebook: boolean;

  @Column({ type: DataType.BOOLEAN })
  tiktok: boolean;

  @Column({ type: DataType.BOOLEAN })
  mercadolibre: boolean;

  @Column({ type: DataType.BOOLEAN })
  whatsapp: boolean;

  @Column({ type: DataType.BOOLEAN })
  conlallave: boolean;
}
