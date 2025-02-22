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
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Document } from './entities/document.entity';

@ApiTags('Документ')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({ summary: 'Создание документа' })
  @ApiResponse({ status: 200, description: 'Пассажир создан', type: Document })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @ApiOperation({ summary: 'Получить документы пассажира' })
  @ApiResponse({
    status: 200,
    description: 'Документы получены',
    type: [Document],
  })
  @Get()
  public async findByPassengerId(@Body() passengerId: string) {
    return this.documentService.findByPassengerId(passengerId);
  }

  @ApiOperation({ summary: 'Получение всех документов' })
  @ApiResponse({ status: 200, description: 'Все документы', type: [Document] })
  @Get('/all')
  public async findAll() {
    return this.documentService.findAll();
  }

  @ApiOperation({ summary: 'Получение документа' })
  @ApiResponse({ status: 200, description: 'Документ', type: Document })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.documentService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление документа' })
  @ApiResponse({
    status: 200,
    description: 'Документ обновлен',
    type: Document,
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @ApiOperation({ summary: 'Удаление документа' })
  @ApiResponse({ status: 200, description: 'Документ удален' })
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
