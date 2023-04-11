import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPositiveRequest } from 'src/core/types/main';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly userRepository: UserRepository
  ) {}

  async saveFile(file: FileEntity): Promise<FileEntity> {
    const savedFile = await this.fileRepository.save(file);

    if (!savedFile) {
      throw new BadRequestException('Couldn`t save file');
    }

    return savedFile;
  }

  async checkEqualFileName(
    fileName: string,
    parentFolderId: string | null
  ): Promise<void> {
    const existingFile = await this.fileRepository
      .createQueryBuilder('files')
      .where('files.name = :name', { name: fileName })
      .andWhere('files.parentFolderId = :parentFolderId', { parentFolderId })
      .getOne();

    if (existingFile) throw new NotFoundException('Name is already exist');
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
    createFileDto: CreateFileDto
  ): Promise<IPositiveRequest> {
    const user = await this.userRepository.findOneById(userId);

    const { parentFolderId } = createFileDto;
    const { originalname, mimetype, buffer, size } = file;

    const newFile = this.fileRepository.create();

    if (!newFile) {
      throw new BadRequestException('Couldn`t create file');
    }

    if (parentFolderId) {
      await this.checkEqualFileName(originalname, parentFolderId);
    }
    newFile.user = user;
    newFile.name = originalname;
    newFile.mimetype = mimetype;
    newFile.size = size;
    newFile.buffer = buffer;

    await this.saveFile(newFile);
    return { success: true };
  }

  async getFileById(fileId: string) {
    const searchFile = await this.fileRepository.findOne({
      where: { id: fileId },
    });

    if (!searchFile) {
      throw new NotFoundException('File not found');
    }
    return searchFile;
  }

  async updateFile(
    fileId: string,
    updateFileDto: UpdateFileDto
  ): Promise<FileEntity> {
    const { name, isPublic } = updateFileDto;
    const newFile = await this.getFileById(fileId);

    if (name) {
      await this.checkEqualFileName(name, fileId);
      newFile.name = name;
    }

    newFile.isPublic = isPublic ?? newFile.isPublic;
    return await this.saveFile(newFile);
  }

  async deleteFile(id: string) {
    const file = await this.getFileById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return { success: true };
  }

  async searchFilesByName(
    userId: string,
    searchTerm: string
  ): Promise<FileEntity[]> {
    const queryBuilder = this.fileRepository
      .createQueryBuilder('files')
      .where('files.user = :userId', { userId: userId })
      .andWhere('files.parentFolder IS NULL')
      .orderBy('files.created_at', 'DESC');

    if (searchTerm) {
      queryBuilder.where('files.name ILIKE :name', {
        name: `%${searchTerm}%`,
      });
    }

    const searchFiles = await queryBuilder.getMany();

    return searchFiles;
  }
}
