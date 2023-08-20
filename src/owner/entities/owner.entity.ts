import {AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Property} from "../../property/entities/property.entity";

@Table({tableName: 'Owner'})
export class Owner extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    id: number;

    @HasMany(() => Property)
    properties: Property[]

    @Column({ type: DataType.STRING })
    firstName: string;

    @Column({ type: DataType.STRING })
    lastName: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    phone: string;

    @Column({ type: DataType.DATE })
    birthdate: string;

    @Column({ type: DataType.BOOLEAN })
    isInvestor: boolean;
}
