import { PartialType } from '@nestjs/swagger';

import { PaginateDto } from '../../core/dto/paginate.dto';

export class PaginateUsersDto extends PartialType(PaginateDto) {}
