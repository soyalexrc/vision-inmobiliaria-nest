import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DigitalSignatureRequest } from "../../common/files/entities/digital-signature-request.entity";

@Table({ tableName: 'Ally' })
export class Ally extends Model {
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

  @Column({ type: DataType.DATE, allowNull: true })
  birthDate: Date;

  @HasMany(() => DigitalSignatureRequest)
  digitalSignatureRequests: DigitalSignatureRequest;
}
