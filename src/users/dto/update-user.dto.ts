import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  username?: string;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}
