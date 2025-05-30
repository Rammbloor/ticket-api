import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TicketModule } from './modules/ticket/ticket.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { DocumentModule } from './modules/document/document.module';
import { Passenger } from './modules/passenger/entities/passenger.entity';
import { Ticket } from './modules/ticket/entities/ticket.entity';
import { Document } from './modules/document/entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [Ticket, Passenger, Document],
        synchronize: false,
      }),
    }),
    TicketModule,
    PassengerModule,
    DocumentModule,
  ],
})
export class AppModule {}
