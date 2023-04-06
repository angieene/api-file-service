import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permision.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
