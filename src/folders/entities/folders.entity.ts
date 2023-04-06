import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity('folders')
export class FolderEntity extends BaseEntity {
  constructor(partial: Partial<FolderEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ type: Boolean })
  @Column({ default: true })
  isPublic: boolean;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.folders)
  user: UserEntity;

  @ApiProperty({ type: [FileEntity] })
  @OneToMany(() => FileEntity, (file) => file.parentFolder, {
    nullable: true,
  })
  childFiles: FileEntity[];

  @ApiProperty({ type: () => FolderEntity })
  @ManyToOne(() => FolderEntity, (folder) => folder.id, {
    nullable: true,
  })
  parentFolder: FolderEntity;

  @ApiProperty({ type: [FolderEntity] })
  @OneToMany(() => FolderEntity, (folder) => folder.parentFolder, {
    nullable: true,
  })
  childFolders: FolderEntity[];
}
