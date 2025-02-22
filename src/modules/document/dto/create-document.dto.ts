import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'Паспорт', description: 'Тип документа' })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty({ example: '123456', description: 'Номер документа' })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({
    example: '6e8f4e02-c91c-465f-b22d-4c8d3d9d2b6b',
    description: 'id пассажира',
  })
  @IsOptional()
  @IsUUID()
  passengerId: string;
}
