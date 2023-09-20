import { AutoIncrement, BelongsTo, BelongsToMany, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
// import { PropertyAttribute } from '../../property/entities/property-attribute.entity';
// import { Property } from '../../property/entities/property.entity';

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
  options: string;

  @Column
  value: string;

  // @BelongsToMany(() => Property, () => PropertyAttribute)
  // properties: Property[];
}
