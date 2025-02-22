import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerService } from '../passenger/passenger.service';

@Injectable()
export class TicketService {
  constructor(
    private readonly passengerService: PassengerService,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
  ) {}

  public async create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketRepository.create(createTicketDto);
    if (createTicketDto.passengerId) {
      const passenger = await this.passengerService.findOne(
        createTicketDto.passengerId,
      );
      if (!passenger) {
        throw new NotFoundException('Пассажир не найден');
      }
      ticket.passenger = passenger;
    }
    return this.ticketRepository.save(ticket);
  }

  public async getPassengerReport(
    passengerId: string,
    startDate: string,
    endDate: string,
  ) {
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    const bookedBeforeFlownNow = await this.ticketRepository.find({
      where: {
        passenger: { id: passengerId },
        bookingDate: LessThan(start),
        departureDate: Between(start, end),
      },
    });

    const bookedNowNotFlown = await this.ticketRepository.find({
      where: {
        passenger: { id: passengerId },
        bookingDate: Between(start, end),
        departureDate: MoreThan(end),
      },
    });

    const bookedNowFlownNow = await this.ticketRepository.find({
      where: {
        passenger: { id: passengerId },
        bookingDate: Between(start, end),
        departureDate: Between(start, end),
      },
    });

    return {
      bookedBeforeFlownNow: bookedBeforeFlownNow.map((ticket) =>
        this.formatTicket(ticket),
      ),
      bookedNowNotFlown: bookedNowNotFlown.map((ticket) =>
        this.formatTicket(ticket),
      ),
      bookedNowFlownNow: bookedNowFlownNow.map((ticket) =>
        this.formatTicket(ticket),
      ),
    };
  }

  private formatTicket(ticket: Ticket) {
    return {
      bookingDate: ticket.bookingDate,
      departureDate: ticket.departureDate,
      orderNumber: ticket.orderNumber,
      from: ticket.departure,
      to: ticket.destination,
      serviceProvided: !!ticket.arrivalDate,
    };
  }

  public async findAll() {
    const tickets = await this.ticketRepository.find({ relations: ['passenger'] });
    if (tickets.length === 0) {
      throw new NotFoundException('Билеты не найдены');
    }
    return tickets;
  }

  public async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['passenger', 'passenger.documents'],
    });

    if (!ticket) {
      throw new NotFoundException('Билет не найден');
    }

    return ticket;
  }

  public async update(id: string, updateTicketDto: UpdateTicketDto) {
    let ticket = await this.findOne(id);
    if (updateTicketDto.passengerId) {
      const passenger = await this.passengerService.findOne(
        updateTicketDto.passengerId,
      );
      if (!passenger) {
        throw new NotFoundException('Пассажир не найден');
      }
    }
    ticket = this.ticketRepository.merge(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  public async remove(id: string) {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
    return true;
  }
}
