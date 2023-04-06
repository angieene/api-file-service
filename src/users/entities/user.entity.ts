import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FileEntity } from 'src/files/entities/file.entity';
import { FolderEntity } from 'src/folders/entities/folders.entity';
import { Exclude } from 'class-transformer';
import { PermissionEntity } from 'src/permisions/entities/permission.entity';

@Entity('users')
export class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ type: String })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ApiProperty({ type: String })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '200', nullable: false })
  username: string;

  @ApiProperty({ type: String })
  @Column({
    type: 'varchar',
    length: '200',
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @ApiProperty({ type: [FileEntity] })
  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[];

  @ApiProperty({ type: [FolderEntity] })
  @OneToMany(() => FolderEntity, (folder) => folder.user)
  folders: FolderEntity[];

  @ApiProperty({ type: [PermissionEntity] })
  @OneToMany(() => PermissionEntity, (sharedFolder) => sharedFolder.file)
  shared_files: PermissionEntity[];

  @ApiProperty({ type: String })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  refreshToken?: string;
}
