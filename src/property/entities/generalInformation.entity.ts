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

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING })
  operationType: string;

  @Column({ type: DataType.STRING })
  propertyType: string;

  @Column({ type: DataType.STRING })
  propertyCondition: string;

  @Column({ type: DataType.STRING })
  propertyExclusivity: string;

  @Column({ type: DataType.BOOLEAN })
  handoverKeys: boolean;

  @Column({ type: DataType.BOOLEAN })
  termsAndConditionsAccepted: boolean;

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
  publicationOnBuilding: boolean;

  @Column({ type: DataType.BOOLEAN })
  conlallave: boolean;
}
