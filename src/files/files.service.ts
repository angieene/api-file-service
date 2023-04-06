import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { IPositiveRequest } from 'src/core/types/main';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async saveFile(file: FileEntity): Promise<FileEntity> {
    const savedFile = await this.fileRepository.save(file);

    if (!savedFile) {
      throw new BadRequestException('Couldn`t save file');
    }

    return savedFile;
  }

  async checkEqualFileName(fileName: string, fileId?: string): Promise<void> {
    const equalFolder = await this.fileRepository.findOne({
      where: {
        name: fileName,
        ...(fileId && { id: Not(fileId) }),
      },
    });

    if (equalFolder) throw new NotFoundException('Name is already exist');
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
    createFileDto: CreateFileDto,
  ): Promise<IPositiveRequest> {
    const { originalname, mimetype, buffer, size } = file;

    const newFile = this.fileRepository.create();

    if (!newFile) {
      throw new BadRequestException('Couldn`t create file');
    }

    newFile.name = originalname;
    newFile.mimetype = mimetype;
    newFile.size = size;
    newFile.buffer = buffer;

    await this.saveFile(newFile);
    return { success: true };
  }

  async getSameFileName(fileName: string, fileId: string): Promise<FileEntity> {
    const equalFile = await this.fileRepository.findOne({
      where: {
        name: fileName,
        id: Not(fileId),
      },
    });

    return equalFile;
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
    updateFileDto: UpdateFileDto,
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
    searchTerm: string,
  ): Promise<FileEntity[]> {
    const queryBuilder = this.fileRepository
      .createQueryBuilder('files')
      .where('files.user = :userId', { userId: userId })
      .orderBy('files.created_at', 'DESC');

    if (searchTerm) {
      queryBuilder.where('files.name ILIKE :name', {
        name: `%${searchTerm}%`,
      });
    }

    const searchFiles = await queryBuilder.getMany();

    return searchFiles;
  }

  // async cloneFile(id: number): Promise<File> {
  //   const file = await this.getFileById(id);
  //   const clonedFile = this.fileRepository.create({
  //     ...file,
  //     id: undefined,
  //     name: `Copy of ${file.name}`,
  //   });
  //   await this.fileRepository.save(clonedFile);
  //   return clonedFile;
  // }
}
