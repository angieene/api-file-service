import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { PermissionsEnum } from 'src/core/enums';
import { FolderEntity } from 'src/folders/entities/folders.entity';

@Entity('shared_folders')
export class SharedFolderEntity extends BaseEntity {
  constructor(partial: Partial<SharedFolderEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: FolderEntity })
  @ManyToOne(() => FolderEntity, (folder) => folder.id)
  folder: FolderEntity;

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ApiProperty({ type: PermissionsEnum })
  @Column({
    type: 'enum',
    enum: PermissionsEnum,
    default: PermissionsEnum.View,
  })
  permission: PermissionsEnum;
}
