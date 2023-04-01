import { PartialType } from '@nestjs/swagger';
import { CreateFoldeDto } from './create-folde.dto';

export class UpdateFoldeDto extends PartialType(CreateFoldeDto) {}
