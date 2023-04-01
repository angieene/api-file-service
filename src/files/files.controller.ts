import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';

import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  // @Post('/:fileId/image')
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(new ValidationPipe())
  // @Roles(UserRolesEnum.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  // async uploadFile(
  //   @Param('fileId', IdValidationPipe) carId: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return await this.filesService.addImage(carId, file);
  // }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
