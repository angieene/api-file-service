import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class GetFilesDto {
  @ApiPropertyOptional({ type: String })
  @IsUUID()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  parentFolderId?: string;
}
