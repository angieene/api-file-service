import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  username: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  picture: string;
}
