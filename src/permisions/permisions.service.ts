import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilesService } from 'src/files/files.service';
import { UserRepository } from 'src/users/user.repository';
import { CreatePermissionDto } from './dto/create-permision.dto';
import { PermissionEntity } from './entities/permission.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
    private readonly userRepository: UserRepository,
    private readonly filesService: FilesService,
    private readonly mailerService: MailerService,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto,
    ownerId: string,
  ): Promise<PermissionEntity> {
    const { email, fileId, type } = createPermissionDto;
    const owner = await this.userRepository.findOneById(ownerId);
    const file = await this.filesService.getFileById(fileId);
    const permission = this.permissionRepository.create({
      email,
      type,
      user: owner,
      file,
    });
    await this.permissionRepository.save(permission);
    const permissionsUrl = process.env.PERMITION_URL + `${permission.id}`;
    const mail = {
      to: email,
      subject: 'You have been granted access to a file',
      context: {
        ownerName: owner.username,
        fileName: file.name,
        permissionsUrl,
      },
    };
    await this.mailerService.sendMail(mail);
    return permission;
  }

  // async getPermissionsByFileId(fileId: string): Promise<PermissionEntity[]> {
  //   const file = await this.filesService.getFileById(fileId);

  //   // return this.permissionRepository.find({
  //   //   where: { file: file },
  //   // });
  // }

  async getPermissionById(permissionId: string): Promise<PermissionEntity> {
    const searchPermition = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });
    if (!searchPermition) throw new NotFoundException('Permition not found');
    return searchPermition;
  }

  async deletePermission(permissionId: string): Promise<void> {
    const permission = await this.getPermissionById(permissionId);
    await this.permissionRepository.remove(permission);
  }

  //   async checkPermission(
  //     user: UserEntity,
  //     fileId: string,
  //     type: FilePermissionEnum,
  //   ): Promise<boolean> {
  //     const file = await this.filesService.getFileById(fileId);
  //     if (file.isPublic) {
  //       return true;
  //     }
  //     const permission = await this.permissionRepository.findOne({
  //       where: { user: user, file: file, type: type },
  //     });
  //     return permission !== undefined;
  //   }

  async findAll(permissionId: string, userId: string) {
    const searchPermission = await this.permissionRepository.find({
      where: { id: permissionId },
    });

    if (!searchPermission.length)
      throw new NotFoundException('Permitions not found');

    return searchPermission;
  }

  // async update(permissionId: string) {
  //   return this.permissionsService.update(permissionId, updatePermisionDto);
  // }

  // async remove(permissionId: string) {
  //   return this.permissionsService.remove(permissionId);
  // }
}
