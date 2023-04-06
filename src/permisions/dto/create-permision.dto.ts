import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { FilePermissionEnum } from 'src/core/enums';

export class CreatePermissionDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '23423' })
  @IsNotEmpty()
  fileId: string;

  @ApiProperty({
    example: FilePermissionEnum.VIEW,
    enum: FilePermissionEnum,
    default: FilePermissionEnum.VIEW,
  })
  @IsNotEmpty()
  @IsEnum(FilePermissionEnum)
  type: FilePermissionEnum;
}
