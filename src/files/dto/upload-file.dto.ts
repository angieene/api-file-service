import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { FolderEntity } from 'src/folders/entities/folders.entity';
import { SharedFileEntity } from 'src/shared-files/entities/shared-file.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  filename: string;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEmail()
  buffer: string;

  minetype: string;

  size: number;

  description: string;

  isPublic: boolean;

  folder: FolderEntity;
}
