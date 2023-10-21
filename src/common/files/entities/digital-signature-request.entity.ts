import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Client } from '../../../client/entities/client.entity';
import { Owner } from '../../../owner/entities/owner.entity';
import { Ally } from '../../../ally/entities/ally.entity';
import { ExternalAdviser } from '../../../external-adviser/entities/external-adviser.entity';

@Table({ tableName: 'DigitalSignatureRequest'})
export class DigitalSignatureRequest extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING })
  filePath: string;

  @Column({ type: DataType.STRING })
  signedDocumentPath: string;

  @Column({ type: DataType.DATE })
  expiresAt: Date;

  @Column({ type: DataType.STRING })
  sendToEmail: string;

  @Column({ type: DataType.STRING })
  requestedBy: string;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.JSONB })
  sendToData: any;

  @ForeignKey(() => Client)
  @Column
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Owner)
  @Column
  ownerId: number;

  @BelongsTo(() => Owner)
  owner: Owner;

  @ForeignKey(() => Ally)
  @Column
  allyId: number;

  @BelongsTo(() => Ally)
  ally: Ally;

  @ForeignKey(() => ExternalAdviser)
  @Column
  externalAdviserId: number;

  @BelongsTo(() => ExternalAdviser)
  externalAdviser: ExternalAdviser;
}
