import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Attribute' })
export class Attribute extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column('number')
  id: number;

  @Column
  propertyType: string;

  @Column
  formType: string;

  @Column
  label: string;

  @Column
  category: string;

  @Column
  placeholder: string;

  @Column
  values: string;

  @Column
  value: string;
}
