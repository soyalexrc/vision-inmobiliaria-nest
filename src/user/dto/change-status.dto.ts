import {IsBoolean, IsInt} from "class-validator";

export class ChangeStatusDto {
    @IsInt()
    id: number;

    @IsBoolean()
    value: boolean;
}