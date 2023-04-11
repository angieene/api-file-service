import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SerchfFoldersAndFilesDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(3000)
  searchTerm?: string;
}
