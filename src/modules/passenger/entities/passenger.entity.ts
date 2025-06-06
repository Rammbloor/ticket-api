import { Ticket } from '../../ticket/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from '../../document/entities/document.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пассажира' })
  @Column({ name: 'last_name' })
  lastName: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пассажира' })
  @Column({ name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пассажира' })
  @Column({ name: 'middle_name' })
  middleName: string;

  @OneToMany(() => Ticket, (ticket) => ticket.passenger, { cascade: true })
  tickets: Ticket[];

  @OneToMany(() => Document, (document) => document.passenger, {
    cascade: true,
  })
  documents: Document[];
}
