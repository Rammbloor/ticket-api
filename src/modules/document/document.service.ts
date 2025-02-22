import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { PassengerService } from '../passenger/passenger.service';

@Injectable()
export class DocumentService {
  constructor(
    private readonly passengerService: PassengerService,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  public async create(createDocumentDto: CreateDocumentDto) {
    const document = this.documentRepository.create(createDocumentDto);
    if (createDocumentDto.passengerId) {
      const passenger = await this.passengerService.findOne(
        createDocumentDto.passengerId,
      );
      if (!passenger) {
        throw new NotFoundException('Пассажир не найден');
      }
      document.passenger = passenger;
    }
    return this.documentRepository.save(document);
  }

  public async findByPassengerId(passengerId: string) {
    const documents = await this.documentRepository.find({
      where: { passenger: { id: passengerId } },
    });

    if (documents.length === 0) {
      throw new NotFoundException('Пассажиры не найдены');
    }
    return documents;
  }

  public async findAll() {
    const documents = await this.documentRepository.find();
    if (documents.length === 0) {
      throw new NotFoundException('Документы не найдены');
    }
    return documents;
  }

  public async findOne(id: string) {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['passenger'],
    });
    if (!document) {
      throw new NotFoundException('Документ не найден');
    }
    return document;
  }

  public async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    let document = await this.findOne(id);
    if (updateDocumentDto.passengerId) {
      const passenger = await this.passengerService.findOne(
        updateDocumentDto.passengerId,
      );
      if (!passenger) {
        throw new NotFoundException('Пассажир не найден');
      }
      document = this.documentRepository.merge(document, updateDocumentDto);
      return this.documentRepository.save(document);
    }
  }

  public async remove(id: string) {
    const document = await this.findOne(id);
    await this.documentRepository.remove(document);
    return true;
  }
}
