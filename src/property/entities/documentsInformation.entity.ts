import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './property.entity';

@Table({ tableName: 'DocumentsInformation' })
export class DocumentsInformation extends Model {
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
  propertyDoc: boolean;

  @Column({ type: DataType.BOOLEAN })
  CIorRIF: boolean;

  @Column({ type: DataType.BOOLEAN })
  ownerCIorRIF: boolean;

  @Column({ type: DataType.BOOLEAN })
  spouseCIorRIF: boolean;

  @Column({ type: DataType.BOOLEAN })
  isCadastralRecordSameOwner: boolean;

  @Column({ type: DataType.BOOLEAN })
  condominiumSolvency: boolean;

  @Column({ type: DataType.BOOLEAN })
  mainProperty: boolean;

  @Column({ type: DataType.STRING })
  mortgageRelease: string;

  @Column({ type: DataType.STRING })
  condominiumSolvencyDetails: string;

  @Column({ type: DataType.STRING })
  power: string;

  @Column({ type: DataType.STRING })
  successionDeclaration: string;

  @Column({ type: DataType.STRING })
  courtRulings: string;

  @Column({ type: DataType.STRING })
  cadastralRecordYear: string;

  @Column({ type: DataType.STRING })
  realStateTaxYear: string;

  @Column({ type: DataType.STRING })
  attorneyEmail: string;

  @Column({ type: DataType.STRING })
  attorneyPhone: string;

  @Column({ type: DataType.STRING })
  attorneyFirstName: string;

  @Column({ type: DataType.STRING })
  attorneyLastName: string;
}
