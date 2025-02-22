import { Passenger } from '../../passenger/entities/passenger.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Паспорт', description: 'Тип документа' })
  @Column({ name: 'document_type' })
  documentType: string;

  @ApiProperty({ example: '123456', description: 'Номер документа' })
  @Column({ name: 'document_number' })
  documentNumber: string;

  @ManyToOne(() => Passenger, (passenger) => passenger.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passenger_id' })
  passenger: Passenger;
}
