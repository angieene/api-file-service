import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoldesService } from './folders.service';
import { CreateFoldeDto } from './dto/create-folde.dto';
import { UpdateFoldeDto } from './dto/update-folde.dto';

@Controller('foldes')
export class FoldesController {
  constructor(private readonly foldesService: FoldesService) {}

  @Post()
  create(@Body() createFoldeDto: CreateFoldeDto) {
    return this.foldesService.create(createFoldeDto);
  }

  @Get()
  findAll() {
    return this.foldesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foldesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoldeDto: UpdateFoldeDto) {
    return this.foldesService.update(+id, updateFoldeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foldesService.remove(+id);
  }
}
