import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';

import { UpdateFileDto } from './dto/update-file.dto';
import { CreateFileDto } from './dto/create-file.dto';

import { User } from 'src/users/decorator/user.decorator';
import { IPositiveRequest } from 'core/types/main';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get file' })
  @ApiResponse({ type: FileEntity })
  @UseGuards(AuthGuard('jwt'))
  @Get('get-one/:fileId')
  async getFile(@Param('fileId') fileId: string): Promise<FileEntity> {
    return this.filesService.getFileById(fileId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update file data' })
  @ApiResponse({ type: FileEntity })
  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:fileId')
  async updateFile(
    @Param('fileId') fileId: string,
    @Body() updateFileDto: UpdateFileDto
  ): Promise<FileEntity> {
    return this.filesService.updateFile(fileId, updateFileDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete file' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:fileId')
  async deleteFile(@Param('fileId') fileId: string): Promise<IPositiveRequest> {
    return this.filesService.deleteFile(fileId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @User('id') id: string,
    @Query() createFileDto: CreateFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 500000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    return this.filesService.uploadFile(file, id, createFileDto);
  }
}
