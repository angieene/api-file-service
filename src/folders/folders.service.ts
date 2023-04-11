import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, TreeRepository } from 'typeorm';

import { IPositiveRequest } from 'core/types/main';
import { UserRepository } from 'src/users/user.repository';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderEntity } from './entities/folders.entity';

@Injectable()
export class FoldesService {
  constructor(
    @InjectRepository(FolderEntity)
    private readonly folderRepository: Repository<FolderEntity>,
    private readonly userRepository: UserRepository
  ) {}

  async saveFolder(folder: FolderEntity): Promise<FolderEntity> {
    const savedFile = await this.folderRepository.save(folder);

    if (!savedFile) {
      throw new BadRequestException('Couldn`t save folder');
    }

    return savedFile;
  }

  async getFolderById(folderId: string): Promise<any> {
    const treeRepository = this.folderRepository as TreeRepository<
      FolderEntity
    >;

    const searchFolder = await this.folderRepository.findOne({
      relations: ['user', 'childFolders', 'parentFolder', 'childFiles'],
      where: {
        id: folderId,
      },
    });

    if (!searchFolder) {
      throw new NotFoundException('Folder is not exist');
    }
    const parentFolders: FolderEntity[] = [];

    let parent = searchFolder.parentFolder;
    while (parent) {
      parentFolders.push(parent);
      parent = parent.parentFolder;
    }

    const parents = await treeRepository.findAncestors(searchFolder);

    return { ...searchFolder, parentFolders: parents };
  }

  async checkEqualFolderName(
    folderName: string,
    folderId?: string
  ): Promise<void> {
    const equalFolder = await this.folderRepository.findOne({
      where: {
        name: folderName,
        ...(folderId && { id: Not(folderId) }),
      },
    });

    if (equalFolder) throw new NotFoundException('Name is already exist');
  }

  async checkEqualFolderNameID(
    folderName: string,
    parentFolderId: string | null
  ): Promise<void> {
    const existingFolder = await this.folderRepository
      .createQueryBuilder('folders')
      .where('folders.name = :name', { name: folderName })
      .andWhere('folders.parentFolderId = :parentFolderId', { parentFolderId })
      .getOne();

    if (existingFolder) throw new NotFoundException('Name is already exist');
  }

  async createFolder(
    createFolderDto: CreateFolderDto,
    userId: string
  ): Promise<IPositiveRequest> {
    const { name, parentFolderId } = createFolderDto;
    const user = await this.userRepository.findOneById(userId);

    const newFolder = this.folderRepository.create();
    if (!newFolder) {
      throw new BadRequestException('Couldn`t create folder');
    }
    const parentFolder = await this.getFolderById(parentFolderId);
    newFolder.parentFolderId = parentFolderId;
    newFolder.parentFolder = parentFolder;

    await this.checkEqualFolderNameID(name, parentFolderId);

    newFolder.name = name;
    newFolder.user = user;

    await this.saveFolder(newFolder);

    return { success: true };
  }

  async updateFolder(
    updateFolderDto: UpdateFolderDto,
    folderId: string
  ): Promise<FolderEntity> {
    const { name } = updateFolderDto;
    const updateFolder = await this.getFolderById(folderId);

    await this.checkEqualFolderName(name, folderId);
    updateFolder.name = name;

    return await this.saveFolder(updateFolder);
  }

  async deleteFolder(folderId: string): Promise<IPositiveRequest> {
    const deleteFolder = await this.folderRepository.delete(folderId);
    if (!deleteFolder) throw new BadRequestException('Couldn`t delete folder');

    return { success: true };
  }

  async searchFoldersByName(
    userId: string,
    searchTerm: string
  ): Promise<FolderEntity[]> {
    const queryBuilder = this.folderRepository
      .createQueryBuilder('folders')
      .where('folders.user = :userId', { userId: userId })
      .andWhere('folders.parentFolder IS NULL')
      .leftJoinAndSelect('folders.childFolders', 'childFolders')
      .leftJoinAndSelect('folders.childFiles', 'childFiles')
      .orderBy('folders.name', 'ASC');

    if (searchTerm) {
      queryBuilder.where('folders.name ILIKE :name', {
        name: `%${searchTerm}%`,
      });
    }

    const searchFolders = await queryBuilder.getMany();

    return searchFolders;
  }

  async getRoot(userId: string): Promise<FolderEntity> {
    const queryBuilder = this.folderRepository
      .createQueryBuilder('folders')
      .where('folders.user = :userId', { userId: userId })
      .andWhere('folders.parentFolderId is NULL')
      .leftJoinAndSelect('folders.childFolders', 'childFolders')
      .orderBy('folders.name', 'ASC')
      .getOne();

    return queryBuilder;
  }
}
