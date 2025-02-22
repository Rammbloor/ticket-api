import { CreateDocumentDto } from './create-document.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
