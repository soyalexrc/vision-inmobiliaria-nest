import { IsInt, IsString } from 'class-validator';

export class SendDigitalSignatureDto {
  @IsInt()
  digitalSignatureRequestId: string;

  @IsString()
  digitalSignature: string;
}
