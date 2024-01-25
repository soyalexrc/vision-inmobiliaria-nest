import { IsArray, IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNull } from "sequelize-typescript";

export class CreateClientDto {
  @IsInt()
  @IsOptional()
  property_id: number;

  @IsString()
  @IsOptional()
  id: number;

  @IsString()
  contactFrom: string;

  @IsString()
  serviceName: string;

  @IsString()
  subServiceName: string;

  @IsString()
  @IsOptional()
  m2: string;

  @IsString()
  @IsOptional()
  remodeledAreas: string;

  @IsString()
  @IsOptional()
  propertyDistribution: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsInt()
  user_id: number;

  @IsInt()
  service_id: number;

  @IsInt()
  subService_id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  referrer: string;

  @IsString()
  @IsOptional()
  usageProperty: string;

  @IsString()
  requirementStatus: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  typeOfCapture: string;

  @IsString()
  @IsOptional()
  propertyLocation: string;

  @IsString()
  @IsOptional()
  aspiredPrice: string;

  @IsString()
  @IsOptional()
  typeOfBusiness: string;

  @IsString()
  @IsOptional()
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
  typeOfPerson: string;

  @IsString()
  @IsOptional()
  personEntry: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  specificRequirement: string;

  @IsString()
  @IsOptional()
  interestDate: string;

  @IsString()
  @IsOptional()
  appointmentDate: string;

  @IsString()
  @IsOptional()
  inspectionDate: string;

  @IsString()
  @IsOptional()
  personHeadquarters: string;

  @IsString()
  @IsOptional()
  personLocation: string;
}
