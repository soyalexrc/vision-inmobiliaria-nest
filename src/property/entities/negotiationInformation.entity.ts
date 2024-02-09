import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './property.entity';

@Table({ tableName: 'NegotiationInformation' })
export class NegotiationInformation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Property)
  @Column
  property_id: number;

  @BelongsTo(() => Property)
  property: Property;

  @Column({ type: DataType.STRING })
  price: string;

  @Column({ type: DataType.STRING })
  minimumNegotiation: string;

  @Column({ type: DataType.STRING })
  client: string;

  @Column({ type: DataType.STRING })
  reasonToSellOrRent: string;

  @Column({ type: DataType.STRING })
  partOfPayment: string;

  @Column({ type: DataType.BOOLEAN })
  mouthToMouth: boolean;

  @Column({ type: DataType.BOOLEAN })
  realStateGroups: boolean;

  @Column({ type: DataType.BOOLEAN })
  realStateWebPages: boolean;

  @Column({ type: DataType.BOOLEAN })
  socialMedia: boolean;

  @Column({ type: DataType.BOOLEAN })
  publicationOnBuilding: boolean;
}
