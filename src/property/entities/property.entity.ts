import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasOne,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { GeneralInformation } from './generalInformation.entity';
import { LocationInformation } from './locationInformation.entity';
import { NegotiationInformation } from './negotiationInformation.entity';
import { PublicationSource } from './publicationSource.entity';
import { Client } from '../../client/entities/client.entity';
import { CashFlow } from '../../cashflow/entities/cashflow.entity';
import { User } from '../../user/entities/user.entity';
import { Owner } from '../../owner/entities/owner.entity';
import { Attribute } from '../../attributes/entities/attribute.entity';
import { PropertyAttribute } from './property-attribute.entity';

@Table({ tableName: 'Property' })
export class Property extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @HasOne(() => GeneralInformation)
  generalInformation: GeneralInformation;

  @HasOne(() => LocationInformation)
  locationInformation: LocationInformation;

  @HasOne(() => NegotiationInformation)
  negotiationInformation: NegotiationInformation;

  @HasOne(() => PublicationSource)
  publicationSource: PublicationSource;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @Column({ type: DataType.INTEGER })
  ally_id: number;

  @ForeignKey(() => Owner)
  @Column({ type: DataType.INTEGER })
  owner_id: number;

  @BelongsTo(() => Owner)
  owner: Owner;

  @HasOne(() => Client)
  client: Client;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  files: string[];

  //   images
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];

  //   Attributes
  @Column({ type: DataType.JSONB })
  attributes: any[];

  @HasMany(() => CashFlow)
  cashflows: CashFlow[];
}
