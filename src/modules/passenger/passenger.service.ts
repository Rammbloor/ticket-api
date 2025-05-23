import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  public async create(createPassengerDto: CreatePassengerDto) {
    const passenger = this.passengerRepository.create(createPassengerDto);
    if (!passenger) {
      throw new BadRequestException('Не удалось создать пассажира');
    }
    return this.passengerRepository.save(passenger);
  }

  public async findAll() {
    const passengers = await this.passengerRepository.find();

    if (passengers.length === 0) {
      throw new NotFoundException('Пассажиры не найдены');
    }
    return passengers;
  }

  public async findByTicketId(ticketId: string) {
    const passengers = await this.passengerRepository.find({
      where: { tickets: { id: ticketId } },
    });

    if (passengers.length === 0) {
      throw new NotFoundException('Пассажиры не найдены');
    }
    return passengers;
  }

  public async findOne(id: string) {
    const passenger = await this.passengerRepository.findOne({ where: { id } });
    if (!passenger) {
      throw new NotFoundException('Пассажир не найден');
    }
    return passenger;
  }

  public async update(id: string, updatePassengerDto: UpdatePassengerDto) {
    let passenger = await this.findOne(id);
    passenger = this.passengerRepository.merge(passenger, updatePassengerDto);
    return this.passengerRepository.save(passenger);
  }

  public async remove(id: string) {
    const passenger = await this.findOne(id);
    await this.passengerRepository.remove(passenger);
    return true;
  }
}
