import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from '../../property/entities/property.entity';
import { CashFlow } from '../../cashflow/entities/cashflow.entity';
import { User } from '../../user/entities/user.entity';
import { Service } from '../../service/entities/service.entity';
import { SubService } from '../../service/entities/sub-service.entity';

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
  usageProperty: string;

  @Column({ type: DataType.STRING })
  referrer: string;

  @Column({ type: DataType.STRING })
  contactFrom: string;

  @Column({ type: DataType.STRING })
  requirementStatus: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING })
  phone: string;

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
  @Column({ type: DataType.DATE, allowNull: true })
  arrivingDate: Date | null;

  // Fecha de salida
  @Column({ type: DataType.DATE, allowNull: true })
  checkoutDate: Date | null;

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

  @Column({ type: DataType.STRING })
  specificRequirement: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.STRING })
  company: string;

  @Column({ type: DataType.STRING })
  serviceName: string;

  @Column({ type: DataType.TEXT })
  remodeledAreas: string;

  @Column({ type: DataType.TEXT })
  propertyDistribution: string;

  @Column({ type: DataType.STRING })
  m2: string;

  @Column({ type: DataType.STRING })
  subServiceName: string;

  @Column({ type: DataType.STRING })
  occupation: string;

  @Column({ type: DataType.DATE, allowNull: true })
  interestDate: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  appointmentDate: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  inspectionDate: Date | null;

  @HasMany(() => CashFlow)
  cashflows: CashFlow[];

  @BelongsTo(() => Service)
  service: Service;

  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER })
  service_id: number;

  @BelongsTo(() => SubService)
  subService: SubService;

  @ForeignKey(() => SubService)
  @Column({ type: DataType.INTEGER })
  subService_id: number;
}
