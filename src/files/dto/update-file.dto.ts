import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateFileDto {
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
