import { Injectable } from '@nestjs/common';
import { CreateSharedFileDto } from './dto/create-shared-file.dto';
import { UpdateSharedFileDto } from './dto/update-shared-file.dto';

@Injectable()
export class SharedFilesService {
  create(createSharedFileDto: CreateSharedFileDto) {
    return 'This action adds a new sharedFile';
  }

  findAll() {
    return `This action returns all sharedFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedFile`;
  }

  update(id: number, updateSharedFileDto: UpdateSharedFileDto) {
    return `This action updates a #${id} sharedFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedFile`;
  }
}
