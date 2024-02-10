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
import { Client } from '../../client/entities/client.entity';
import { CashFlow } from '../../cashflow/entities/cashflow.entity';
import { User } from '../../user/entities/user.entity';
import { Owner } from '../../owner/entities/owner.entity';
import { PropertyStatusEntry } from './property-status-entry.entity';
import { ExternalAdviser } from '../../external-adviser/entities/external-adviser.entity';
import { DocumentsInformation } from './documentsInformation.entity';

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

  @HasOne(() => DocumentsInformation)
  documentsInformation: DocumentsInformation;

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

  @ForeignKey(() => ExternalAdviser)
  @Column({ type: DataType.INTEGER })
  external_adviser_id: number;

  @BelongsTo(() => ExternalAdviser)
  external_adviser: ExternalAdviser;

  @HasOne(() => Client)
  client: Client;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  files: string[];

  @Column({ type: DataType.STRING })
  publicationTitle: string;

  //   images
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];

  @Column({ type: DataType.JSONB })
  attributes: any[];

  @Column({ type: DataType.JSONB })
  distribution: any[];

  @Column({ type: DataType.JSONB })
  services: any[];

  @Column({ type: DataType.JSONB })
  adjacencies: any[];

  @Column({ type: DataType.JSONB })
  equipment: any[];

  @Column({ type: DataType.JSONB })
  furnishedAreas: any[];

  @HasMany(() => PropertyStatusEntry)
  statusHistory: PropertyStatusEntry[];

  // @HasMany(() => PropertyAttribute)
  // attributes: Attribute[];
}
