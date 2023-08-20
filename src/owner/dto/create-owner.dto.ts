import {IsBoolean, IsString} from "class-validator";

export class CreateOwnerDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    birthdate: string;

    @IsString()
    phone: string;

    @IsBoolean()
    isInvestor: boolean;
}
