import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { GeneralInformation } from './generalInformation.entity';
import { LocationInformation } from './locationInformation.entity';
import { NegotiationInformation } from './negotiationInformation.entity';
import { PublicationSource } from './publicationSource.entity';
import { Client } from '../../client/entities/client.entity';

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

  @Column({ type: DataType.INTEGER })
  user_id: number;

  @Column({ type: DataType.INTEGER })
  ally_id: number;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  client_id: number;

  @BelongsTo(() => Client)
  client: Client;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  files: string[];

  //   images
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];

  //   Attributes

  @Column({ type: DataType.JSONB })
  attributes: any[];
}
