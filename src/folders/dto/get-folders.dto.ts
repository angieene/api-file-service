import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GetFolderDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(3000)
  searchTerm?: string;
}
