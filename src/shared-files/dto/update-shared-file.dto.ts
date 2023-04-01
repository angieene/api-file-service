import { PartialType } from '@nestjs/swagger';
import { CreateSharedFileDto } from './create-shared-file.dto';

export class UpdateSharedFileDto extends PartialType(CreateSharedFileDto) {}
