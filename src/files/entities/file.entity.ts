import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/core/entities/base.entity';
import { FolderEntity } from 'src/folders/entities/folders.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SharedFileEntity } from 'src/shared-files/entities/shared-file.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  constructor(partial: Partial<FileEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  buffer: Buffer;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  encoding: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: false })
  size: number;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  path: string;

  @ApiProperty({ type: Boolean })
  @Column({ default: true })
  isPublic: boolean;

  @ApiProperty({ type: FolderEntity })
  @ManyToOne(() => FolderEntity, (folder) => folder.files)
  parentFolder: FolderEntity;

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @ApiProperty({ type: [SharedFileEntity] })
  @OneToMany(() => SharedFileEntity, (sharedFile) => sharedFile.file)
  shared_files: SharedFileEntity[];
}
