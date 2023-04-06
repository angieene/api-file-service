import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { FolderEntity } from './entities/folders.entity';
import { IPositiveRequest } from 'src/core/types/main';
import { UserRepository } from 'src/users/user.repository';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { GetFolderDto } from './dto/get-folders.dto';

@Injectable()
export class FoldesService {
  constructor(
    @InjectRepository(FolderEntity)
    private readonly folderRepository: Repository<FolderEntity>,
    private readonly userRepository: UserRepository,
  ) {}

  async saveFolder(folder: FolderEntity): Promise<FolderEntity> {
    const savedFile = await this.folderRepository.save(folder);

    if (!savedFile) {
      throw new BadRequestException('Couldn`t save folder');
    }

    return savedFile;
  }

  async getFolderById(folderId: string): Promise<FolderEntity> {
    const searchFolder = await this.folderRepository.findOne({
      relations: ['user', 'folders', 'folders.user', 'folders.files', 'files'],
      where: {
        id: folderId,
      },
    });

    if (!searchFolder) {
      throw new NotFoundException('Folder is not exist');
    }

    return searchFolder;
  }

  async checkEqualFolderName(
    folderName: string,
    folderId?: string,
  ): Promise<void> {
    const equalFolder = await this.folderRepository.findOne({
      where: {
        name: folderName,
        ...(folderId && { id: Not(folderId) }),
      },
    });

    if (equalFolder) throw new NotFoundException('Name is already exist');
  }

  async createFolder(
    createFolderDto: CreateFolderDto,
    userId: string,
  ): Promise<IPositiveRequest> {
    const { name, parentFolderId, isPublic } = createFolderDto;
    const user = await this.userRepository.findOneById(userId);

    const newFolder = this.folderRepository.create();
    if (!newFolder) {
      throw new BadRequestException('Couldn`t create folder');
    }

    if (parentFolderId) {
      const parentFolder = await this.getFolderById(parentFolderId);
      newFolder.parentFolder = parentFolder;
    }

    if (name) {
      await this.checkEqualFolderName(name);
      newFolder.name = name;
    }

    newFolder.user = user;
    newFolder.isPublic = isPublic ?? newFolder.isPublic;

    await this.saveFolder(newFolder);

    return { success: true };
  }

  async findAll(
    userId: string,
    getFolderDto: GetFolderDto,
  ): Promise<FolderEntity[]> {
    const { parentFolderId } = getFolderDto;

    const queryBuilder = this.folderRepository
      .createQueryBuilder('folders')
      .where('folders.user = :userId', { userId: userId })
      .leftJoinAndSelect('folders.folders', 'childFolders')
      .leftJoinAndSelect('childFolder.files', 'childFiles')
      .orderBy('folders.name', 'ASC')
      .addOrderBy('childFiles.name', 'ASC');

    if (parentFolderId) {
      queryBuilder.andWhere('folder.parentFolder.id = :parentId', {
        parentId: parentFolderId,
      });
    }

    return await queryBuilder.getMany();
  }

  async updateFolder(
    updateFolderDto: UpdateFolderDto,
    folderId: string,
  ): Promise<FolderEntity> {
    const { name } = updateFolderDto;
    const updateFolder = await this.getFolderById(folderId);

    if (name) {
      await this.checkEqualFolderName(name, folderId);
      updateFolder.name = name;
    }

    return await this.saveFolder(updateFolder);
  }

  async deleteFolder(folderId: string): Promise<IPositiveRequest> {
    const deleteFolder = await this.folderRepository.delete(folderId);
    if (!deleteFolder) throw new BadRequestException('Couldn`t delete folder');

    return { success: true };
  }

  async searchFoldersByName(
    userId: string,
    searchTerm: string,
  ): Promise<FolderEntity[]> {
    const queryBuilder = this.folderRepository
      .createQueryBuilder('folders')
      .where('folders.user = :userId', { userId: userId })
      .leftJoinAndSelect('folders.folders', 'childFolders')
      .leftJoinAndSelect('childFolder.files', 'childFiles')
      .orderBy('folders.created_at', 'DESC');

    if (searchTerm) {
      queryBuilder.where('folders.name ILIKE :name', {
        name: `%${searchTerm}%`,
      });
    }

    const searchFolders = await queryBuilder.getMany();

    return searchFolders;
  }
}
