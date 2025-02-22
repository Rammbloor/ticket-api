import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPassengerReportDto {
  @ApiProperty({ example: '2022-01-01', description: 'Начальная дата' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2022-01-01', description: 'Конечная дата' })
  @IsDateString()
  endDate: string;
}
