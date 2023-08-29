import { IsArray, IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
  @IsInt()
  @IsOptional()
  property_id: number;

  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  contactFrom: string;

  @IsInt()
  user_id: number;

  @IsString()
  name: string;

  @IsString()
  referrer: string;

  @IsString()
  service: string;

  @IsString()
  usageProperty: string;

  @IsBoolean()
  requirementStatus: boolean;

  @IsString()
  operationType: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  typeOfCapture: string;

  @IsString()
  @IsOptional()
  propertyLocation: string;

  @IsString()
  aspiredPrice: string;

  @IsString()
  @IsOptional()
  typeOfBusiness: string;

  @IsString()
  note: string;

  @IsString()
  propertyOfInterest: string;

  @IsBoolean()
  @IsOptional()
  isPotentialInvestor: boolean;

  @IsArray()
  @IsOptional()
  zonesOfInterest: string[];

  @IsArray()
  @IsOptional()
  essentialFeatures: string[];

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  amountOfPeople: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  amountOfPets: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  amountOfYounger: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  amountOfNights: number;

  @IsString()
  @IsOptional()
  arrivingDate: string;

  @IsString()
  @IsOptional()
  checkoutDate: string;

  @IsString()
  @IsOptional()
  reasonOfStay: string;

  @IsString()
  @IsOptional()
  usageOfProperty: string;

  @IsString()
  @IsOptional()
  typeOfPerson: string;

  @IsString()
  @IsOptional()
  personEntry: string;

  @IsString()
  @IsOptional()
  personHeadquarters: string;

  @IsString()
  @IsOptional()
  personLocation: string;
}
