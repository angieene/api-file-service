import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharedFilesService } from './shared-files.service';
import { CreateSharedFileDto } from './dto/create-shared-file.dto';
import { UpdateSharedFileDto } from './dto/update-shared-file.dto';

@Controller('shared-files')
export class SharedFilesController {
  constructor(private readonly sharedFilesService: SharedFilesService) {}

  @Post()
  create(@Body() createSharedFileDto: CreateSharedFileDto) {
    return this.sharedFilesService.create(createSharedFileDto);
  }

  @Get()
  findAll() {
    return this.sharedFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedFilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedFileDto: UpdateSharedFileDto) {
    return this.sharedFilesService.update(+id, updateSharedFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedFilesService.remove(+id);
  }
}
