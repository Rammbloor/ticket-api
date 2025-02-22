import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'Москва', description: 'Пункт отправления' })
  @IsString()
  @IsNotEmpty()
  departure: string;

  @ApiProperty({ example: 'Санкт-Петербург', description: 'Пункт назначения' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: '123456', description: 'Номер билета' })
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty({ example: 'Аэрофлот', description: 'Поставщик услуг' })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({ example: '2022-01-01', description: 'Дата отправления' })
  @IsDateString()
  departureDate: string;

  @ApiProperty({ example: '2022-01-01', description: 'Дата прибытия' })
  @IsDateString()
  arrivalDate: string;

  @ApiProperty({ example: '2022-01-01', description: 'Дата оформления услуг' })
  @IsDateString()
  bookingDate: string;

  @ApiProperty({
    example: '6e8f4e02-c91c-465f-b22d-4c8d3d9d2b6b',
    description: 'id пассажира',
  })
  @IsOptional()
  @IsUUID()
  passengerId?: string;
}
