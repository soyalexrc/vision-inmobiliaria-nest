import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './property.entity';

@Table({ tableName: 'GeneralInformation' })
export class GeneralInformation extends Model {
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
  status: string;

  @Column({ type: DataType.STRING })
  code: string;

  @Column({ type: DataType.STRING })
  footageGround: string;

  @Column({ type: DataType.STRING })
  footageBuilding: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING })
  propertyType: string;

  @Column({ type: DataType.STRING })
  propertyCondition: string;

  @Column({ type: DataType.BOOLEAN })
  handoverKeys: boolean;

  @Column({ type: DataType.BOOLEAN })
  termsAndConditionsAccepted: boolean;

  @Column({ type: DataType.STRING })
  antiquity: string;

  @Column({ type: DataType.STRING })
  zoning: string;

  @Column({ type: DataType.STRING })
  amountOfFloors: string;

  @Column({ type: DataType.STRING })
  propertiesPerFloor: string;

  @Column({ type: DataType.STRING })
  typeOfWork: string;

  @Column({ type: DataType.BOOLEAN })
  isFurnished: boolean;

  @Column({ type: DataType.BOOLEAN })
  isOccupiedByPeople: boolean;
}
