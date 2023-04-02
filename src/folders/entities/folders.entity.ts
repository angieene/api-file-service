import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../core/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { SharedFolderEntity } from '../../shared-folders/entities/shared-folder.entity';

@Entity('folders')
export class FolderEntity extends BaseEntity {
  constructor(partial: Partial<FolderEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  file: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  extension: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: false })
  size: number;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.folders)
  user: UserEntity;

  // @ManyToMany(() => UserEntity, (user) => user.folders)
  // users: UserEntity[];

  @ApiProperty({ type: [SharedFolderEntity] })
  @OneToMany(() => SharedFolderEntity, (sharedFolder) => sharedFolder.folder)
  shared_folders: SharedFolderEntity[];

  @OneToMany(() => FileEntity, (file) => file.folder)
  files: FileEntity[];

  @ManyToOne(() => FolderEntity, (folder) => folder.children, {
    nullable: true,
  })
  parent: FolderEntity;

  @OneToMany(() => FolderEntity, (folder) => folder.parent)
  children: FolderEntity[];
}
