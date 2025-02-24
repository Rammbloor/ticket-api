import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Repository } from 'typeorm';
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
      const passenger = await this.passengerService.findOne(createTicketDto.passengerId);
      if (!passenger) {
        throw new NotFoundException('Пассажир не найден');
      }
      ticket.passenger = passenger;
    }
    return this.ticketRepository.save(ticket);
  }

  public async getPassengerReport(passengerId: string, startDate: string, endDate: string) {
    const passenger = await this.passengerService.findOne(passengerId);

    const queryBuilder = this.ticketRepository.createQueryBuilder('ticket');

    const bookedBeforeFlownNow = await queryBuilder
      .where('ticket.bookingDate < :startDate', { startDate })
      .andWhere('ticket.departureDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    const bookedNowNotFlown = await queryBuilder
      .where('ticket.bookingDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('ticket.departureDate > :endDate', { endDate })
      .getMany();

    const bookedNowFlownNow = await queryBuilder
      .where('ticket.bookingDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('ticket.departureDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    return {
      passenger,
      bookedBeforeFlownNow,
      bookedNowNotFlown,
      bookedNowFlownNow,
    };
  }

  public async findAll() {
    const tickets = await this.ticketRepository.find({
      relations: ['passenger'],
    });
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
      const passenger = await this.passengerService.findOne(updateTicketDto.passengerId);
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
