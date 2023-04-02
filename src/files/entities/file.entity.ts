import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../core/entities/base.entity';
import { FolderEntity } from '../../folders/entities/folders.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { SharedFileEntity } from '../../shared-files/entities/shared-file.entity';

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

  @ApiProperty({ type: FolderEntity })
  @ManyToOne(() => FolderEntity, (folder) => folder.files)
  folder: FolderEntity;

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @ApiProperty({ type: [SharedFileEntity] })
  @OneToMany(() => SharedFileEntity, (sharedFile) => sharedFile.file)
  shared_files: SharedFileEntity[];
}
