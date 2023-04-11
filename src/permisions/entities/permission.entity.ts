import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { FilePermissionEnum } from 'core/enums';
import { FileEntity } from 'src/files/entities/file.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('permissions')
export class PermissionEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String })
  @Column()
  email: string;

  @Column({ type: 'enum', enum: FilePermissionEnum })
  type: FilePermissionEnum;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => FileEntity, (file) => file.permissions)
  file: FileEntity;
}
