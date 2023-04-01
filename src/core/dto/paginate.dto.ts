import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginateDto {
  @ApiProperty({ type: Number, name: 'pageSize', default: 10, required: true })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  pageSize: number;

  @ApiProperty({ type: Number, name: 'page', default: 1, required: true })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;
}
