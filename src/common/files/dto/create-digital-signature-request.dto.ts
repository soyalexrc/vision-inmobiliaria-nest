import { IsObject, IsString } from 'class-validator';

type SendToDataType = 'Propietarios' | 'Clientes' | 'Aliados' | 'Asesores externos';

interface SendToData {
  label: string;
  id: string | number;
  email: string;
  type: SendToDataType;
}

export class CreateDigitalSignatureRequestDto {
  @IsString()
  filePath: string;

  @IsString()
  requestedBy: string;

  @IsObject()
  sendToData: SendToData;
}
