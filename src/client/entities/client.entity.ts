import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from '../../property/entities/property.entity';
import { CashFlow } from '../../cashflow/entities/cashflow.entity';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'Client' })
export class Client extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => Property)
  @Column({ type: DataType.INTEGER })
  property_id: number;

  @BelongsTo(() => Property)
  property: Property;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  contactFrom: string;

  @Column({ type: DataType.BOOLEAN })
  requirementStatus: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  operationType: string;

  @Column({ type: DataType.STRING })
  propertyOfInterest: string;

  @Column({ type: DataType.STRING })
  propertyLocation: string;

  @Column({ type: DataType.STRING })
  typeOfCapture: string;

  @Column({ type: DataType.STRING })
  aspiredPrice: string;

  @Column({ type: DataType.STRING })
  typeOfBusiness: string;

  @Column({ type: DataType.STRING })
  note: string;

  @Column({ type: DataType.BOOLEAN })
  isPotentialInvestor: boolean;

  @Column({ type: DataType.JSONB })
  zonesOfInterest: string[];

  @Column({ type: DataType.JSONB })
  essentialFeatures: string[];

  @Column({ type: DataType.INTEGER })
  amountOfPeople: number;

  @Column({ type: DataType.INTEGER })
  amountOfPets: number;

  @Column({ type: DataType.INTEGER })
  amountOfYounger: number;

  // Fecha de llegada
  @Column({ type: DataType.DATE })
  arrivingDate: Date;

  // Fecha de salida
  @Column({ type: DataType.DATE })
  checkoutDate: Date;

  // Cantidad de noches
  @Column({ type: DataType.INTEGER })
  amountOfNights: number;

  // Motivo de hospedaje
  @Column({ type: DataType.STRING })
  reasonOfStay: string;

  @Column({ type: DataType.STRING })
  usageOfProperty: string;

  @Column({ type: DataType.STRING })
  typeOfPerson: string;

  @Column({ type: DataType.STRING })
  personEntry: string;

  @Column({ type: DataType.STRING })
  personHeadquarters: string;

  @Column({ type: DataType.STRING })
  personLocation: string;

  @HasMany(() => CashFlow)
  cashflows: CashFlow[];
}
