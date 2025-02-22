import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Passenger } from '../../passenger/entities/passenger.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Москва', description: 'Пункт отправления' })
  @Column()
  departure: string;

  @ApiProperty({ example: 'Санкт-Петербург', description: 'Пункт назначения' })
  @Column()
  destination: string;

  @ApiProperty({ example: '123456', description: 'Номер билета' })
  @Column({ unique: true, name: 'order_number' })
  orderNumber: string;

  @ApiProperty({ example: 'Аэрофлот', description: 'Поставщик услуг' })
  @Column()
  provider: string;

  @ApiProperty({ example: '2022-01-01', description: 'Дата отправления' })
  @Column({ name: 'departure_date', type: 'timestamp' })
  departureDate: string;

  @ApiProperty({ example: '2022-01-01', description: 'Дата прибытия' })
  @Column({ name: 'arrival_date', type: 'timestamp' })
  arrivalDate: string;

  @ApiProperty({ example: '2022-01-01', description: 'Дата оформления услуг' })
  @Column({ name: 'booking_date', type: 'timestamp' })
  bookingDate: string;

  @ManyToOne(() => Passenger, (passenger) => passenger.tickets, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'passenger_id' })
  passenger?: Passenger;
}
