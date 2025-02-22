import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassengerDto {
  @ApiProperty({ example: 'Иванов', description: 'Фамилия пассажира' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пассажира' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пассажира' })
  @IsString()
  @IsNotEmpty()
  middleName: string;
}
