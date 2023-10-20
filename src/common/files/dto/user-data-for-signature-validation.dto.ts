import { IsString } from 'class-validator';

export class UserDataForSignatureValidationDto {
  @IsString()
  ci: string;

  @IsString()
  last4PhoneDigits: string;

  @IsString()
  lastname: string;

  @IsString()
  userId: string;
}
