import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharedFoldersService } from './shared-folders.service';
import { CreateSharedFolderDto } from './dto/create-shared-folder.dto';
import { UpdateSharedFolderDto } from './dto/update-shared-folder.dto';

@Controller('shared-folders')
export class SharedFoldersController {
  constructor(private readonly sharedFoldersService: SharedFoldersService) {}

  @Post()
  create(@Body() createSharedFolderDto: CreateSharedFolderDto) {
    return this.sharedFoldersService.create(createSharedFolderDto);
  }

  @Get()
  findAll() {
    return this.sharedFoldersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedFoldersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedFolderDto: UpdateSharedFolderDto) {
    return this.sharedFoldersService.update(+id, updateSharedFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedFoldersService.remove(+id);
  }
}
