import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Passenger } from './entities/passenger.entity';

@ApiTags('Пассажир')
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @ApiOperation({ summary: 'Создать пассажира' })
  @ApiResponse({ status: 200, description: 'Пассажир создан', type: Passenger })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengerService.create(createPassengerDto);
  }

  @ApiOperation({ summary: 'Получить пассажира по билету' })
  @ApiResponse({
    status: 200,
    description: 'Пассажиры получены',
    type: [Passenger],
  })
  @Get()
  public async findByTicketId(@Body() ticketId: string) {
    return this.passengerService.findByTicketId(ticketId);
  }

  @ApiOperation({ summary: 'Получить всех пассажиров' })
  @ApiResponse({
    status: 200,
    description: 'Пассажиры получены',
    type: [Passenger],
  })
  @Get('/all')
  public async findAll() {
    return this.passengerService.findAll();
  }

  @ApiOperation({ summary: 'Получить пассажира' })
  @ApiResponse({
    status: 200,
    description: 'Пассажир получен',
    type: Passenger,
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить пассажира' })
  @ApiResponse({
    status: 200,
    description: 'Пассажир обновлен',
    type: Passenger,
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengerService.update(id, updatePassengerDto);
  }

  @ApiOperation({ summary: 'Удалить пассажира' })
  @ApiResponse({ status: 200, description: 'Пассажир удален' })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.passengerService.remove(id);
  }
}
