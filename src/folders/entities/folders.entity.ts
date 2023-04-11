import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity('folders')
@Tree('nested-set')
export class FolderEntity extends BaseEntity {
  constructor(partial: Partial<FolderEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  parentFolderId: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.folders)
  user: UserEntity;

  @ApiProperty({ type: [FileEntity] })
  @OneToMany(() => FileEntity, (file) => file.parentFolder, {
    nullable: true,
  })
  childFiles: FileEntity[];

  @TreeChildren()
  childFolders: FolderEntity[];

  @TreeParent()
  parentFolder: FolderEntity;
}
