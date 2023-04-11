import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/users/decorator/user.decorator';
import { FilesService } from 'src/files/files.service';
import { IPositiveRequest } from 'src/core/types/main';

import { SerchfFoldersAndFilesDto } from './dto/search-folders-and-files.dto.ts';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

import { FoldesService } from './folders.service';
import { FolderEntity } from './entities/folders.entity';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Folders')
@Controller('folders')
export class FoldesController {
  constructor(
    private readonly foldesService: FoldesService,
    private readonly filesService: FilesService
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create Folder' })
  @ApiBody({ type: CreateFolderDto })
  @ApiResponse({ type: FolderEntity })
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createFolder(
    @Body() createFolderDto: CreateFolderDto,
    @User('id') userId: string
  ): Promise<IPositiveRequest> {
    return this.foldesService.createFolder(createFolderDto, userId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get folder by id' })
  @ApiResponse({ type: FolderEntity })
  @UseGuards(AuthGuard('jwt'))
  @Get('get-one/:folderId')
  async getFolder(@Param('folderId') folderId: string): Promise<FolderEntity> {
    return this.foldesService.getFolderById(folderId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get folders and files by name' })
  @ApiResponse({ type: FolderEntity, isArray: true })
  @UseGuards(JWTAuthGuard)
  @Get('search')
  async getFoldersAndFilesByName(
    @User('id') userId: string,
    @Query() serchfFoldersAndFilesDto: SerchfFoldersAndFilesDto
  ): Promise<any> {
    const folders = await this.foldesService.searchFoldersByName(
      userId,
      serchfFoldersAndFilesDto.searchTerm
    );
    const files = await this.filesService.searchFilesByName(
      userId,
      serchfFoldersAndFilesDto.searchTerm
    );

    return [...folders, ...files];
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update folder data' })
  @ApiBody({ type: UpdateFolderDto })
  @ApiResponse({ type: FolderEntity })
  @UseGuards(AuthGuard('jwt'))
  @Patch('rename/:folderId')
  async updateFolder(
    @Param('folderId') folderId: string,
    @Body() updateFolderDto: UpdateFolderDto
  ): Promise<FolderEntity> {
    return this.foldesService.updateFolder(updateFolderDto, folderId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete folder' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:folderId')
  async deleteFolder(
    @Param('folderId') folderId: string
  ): Promise<IPositiveRequest> {
    return this.foldesService.deleteFolder(folderId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Find root folder' })
  @UseGuards(AuthGuard('jwt'))
  @Get('root')
  async getRoot(@User('id') userId: string): Promise<FolderEntity> {
    return this.foldesService.getRoot(userId);
  }
}
