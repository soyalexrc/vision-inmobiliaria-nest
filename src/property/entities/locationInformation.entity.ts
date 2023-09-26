import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './property.entity';

@Table({ tableName: 'LocationInformation' })
export class LocationInformation extends Model {
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
  location: string;

  @Column({ type: DataType.STRING })
  amountOfFloors: string;

  @Column({ type: DataType.STRING })
  isClosedStreet: string;

  @Column({ type: DataType.STRING })
  country: string;

  @Column({ type: DataType.STRING })
  state: string;

  @Column({ type: DataType.STRING })
  municipality: string;

  @Column({ type: DataType.STRING })
  urbanization: string;

  @Column({ type: DataType.STRING })
  avenue: string;

  @Column({ type: DataType.STRING })
  street: string;

  @Column({ type: DataType.STRING })
  buildingShoppingCenter: string;

  @Column({ type: DataType.STRING })
  buildingNumber: string;

  @Column({ type: DataType.STRING })
  floor: string;

  @Column({ type: DataType.STRING })
  referencePoint: string;

  @Column({ type: DataType.STRING })
  howToGet: string;

  @Column({ type: DataType.STRING })
  trunkNumber: string;

  @Column({ type: DataType.STRING })
  trunkLevel: string;

  @Column({ type: DataType.STRING })
  parkingNumber: string;

  @Column({ type: DataType.STRING })
  parkingLevel: string;

  @Column({ type: DataType.STRING })
  city: string;
}
