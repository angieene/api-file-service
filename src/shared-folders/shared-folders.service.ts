import { Injectable } from '@nestjs/common';
import { CreateSharedFolderDto } from './dto/create-shared-folder.dto';
import { UpdateSharedFolderDto } from './dto/update-shared-folder.dto';

@Injectable()
export class SharedFoldersService {
  create(createSharedFolderDto: CreateSharedFolderDto) {
    return 'This action adds a new sharedFolder';
  }

  findAll() {
    return `This action returns all sharedFolders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedFolder`;
  }

  update(id: number, updateSharedFolderDto: UpdateSharedFolderDto) {
    return `This action updates a #${id} sharedFolder`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedFolder`;
  }
}
