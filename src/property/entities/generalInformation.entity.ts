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
  nomenclature: string;

  @Column({ type: DataType.STRING })
  footageGround: string;

  @Column({ type: DataType.STRING })
  footageBuilding: string;

  @Column({ type: DataType.STRING })
  distributionComments: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  operationType: string;

  @Column({ type: DataType.STRING })
  propertyType: string;

  @Column({ type: DataType.STRING })
  propertyCondition: string;
}
