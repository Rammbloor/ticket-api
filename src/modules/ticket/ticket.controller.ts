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
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ticket } from './entities/ticket.entity';
import { GetPassengerReportDto } from './dto/get-passenger-report.dto';

@ApiTags('Билет')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Создание билета' })
  @ApiResponse({
    status: 201,
    description: 'Билет успешно создан',
    type: Ticket,
  })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOperation({ summary: 'Получение всех билетов' })
  @ApiResponse({
    status: 200,
    description: 'Билеты успешно получены',
    type: [Ticket],
  })
  @Get('/all')
  public async findAll() {
    return this.ticketService.findAll();
  }

  @ApiOperation({ summary: 'Получение билета по id' })
  @ApiResponse({
    status: 200,
    description: 'Билет успешно получен',
    type: Ticket,
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @ApiOperation({ summary: 'Получение отчета о полетах пассажира' })
  @ApiResponse({ status: 200, description: 'Отчет о билетах пассажира успешно получен' })
  @Get('report/:passengerId')
  public async getPassengerReport(@Param('passengerId') passengerId: string, @Body() getPassengerReport: GetPassengerReportDto,) {

    return this.ticketService.getPassengerReport(
      passengerId,
      getPassengerReport.startDate,
      getPassengerReport.endDate,
    );
  }

  @ApiOperation({ summary: 'Обновление билета' })
  @ApiResponse({
    status: 200,
    description: 'Билет успешно обновлен',
    type: Ticket,
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @ApiOperation({ summary: 'Удаление билета' })
  @ApiResponse({ status: 200, description: 'Билет успешно удален' })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
