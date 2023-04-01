import { PartialType } from '@nestjs/swagger';
import { CreateSharedFolderDto } from './create-shared-folder.dto';

export class UpdateSharedFolderDto extends PartialType(CreateSharedFolderDto) {}
