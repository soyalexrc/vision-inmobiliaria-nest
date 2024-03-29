import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from '../../property/entities/property.entity';
import { DigitalSignatureRequest } from "../../common/files/entities/digital-signature-request.entity";

@Table({ tableName: 'ExternalAdviser' })
export class ExternalAdviser extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  realStateName: string;

  @HasMany(() => Property)
  properties: Property[];

  @HasMany(() => DigitalSignatureRequest)
  digitalSignatureRequests: DigitalSignatureRequest;
}
