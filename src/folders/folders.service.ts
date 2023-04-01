import { Injectable } from '@nestjs/common';
import { CreateFoldeDto } from './dto/create-folde.dto';
import { UpdateFoldeDto } from './dto/update-folde.dto';

@Injectable()
export class FoldesService {
  create(createFoldeDto: CreateFoldeDto) {
    return 'This action adds a new folde';
  }

  findAll() {
    return `This action returns all foldes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folde`;
  }

  update(id: number, updateFoldeDto: UpdateFoldeDto) {
    return `This action updates a #${id} folde`;
  }

  remove(id: number) {
    return `This action removes a #${id} folde`;
  }
}
