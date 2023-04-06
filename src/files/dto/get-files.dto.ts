import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GetFilesDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  parentFolderId?: string;
}
