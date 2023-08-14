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
  externalCapacitor: string;

  @Column({ type: DataType.STRING })
  reasonToSellOrRent: string;

  @Column({ type: DataType.STRING })
  contactFistName: string;

  @Column({ type: DataType.STRING })
  contactLastName: string;

  @Column({ type: DataType.STRING })
  contactPhone: string;

  @Column({ type: DataType.STRING })
  contactEmail: string;

  @Column({ type: DataType.STRING })
  attorneyEmail: string;

  @Column({ type: DataType.STRING })
  attorneyPhone: string;

  @Column({ type: DataType.STRING })
  attorneyFirstName: string;

  @Column({ type: DataType.STRING })
  attorneyLastName: string;

  @Column({ type: DataType.STRING })
  partOfPayment: string;
}
