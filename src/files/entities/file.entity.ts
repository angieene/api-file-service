import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from 'core/entities/base.entity';
import { FolderEntity } from 'src/folders/entities/folders.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { PermissionEntity } from 'src/permisions/entities/permission.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  constructor(partial: Partial<FileEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({ type: Uint8Array })
  @Column({
    type: 'bytea',
  })
  buffer: Uint8Array;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false })
  encoding: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: false })
  size: number;

  @ApiProperty({ type: Boolean })
  @Column({ default: true })
  isPublic: boolean;

  @ApiProperty({ type: () => FolderEntity })
  @ManyToOne(() => FolderEntity, (folder) => folder.childFiles)
  parentFolder: FolderEntity;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @ApiProperty({ type: [PermissionEntity] })
  @OneToMany(() => PermissionEntity, (permissions) => permissions.file)
  permissions: PermissionEntity[];
}
