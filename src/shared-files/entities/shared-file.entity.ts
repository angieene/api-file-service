import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../core/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { PermissionsEnum } from '../../core/enums';

@Entity('shared_files')
export class SharedFileEntity extends BaseEntity {
  constructor(partial: Partial<SharedFileEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: FileEntity })
  @ManyToOne(() => FileEntity, (folder) => folder.id)
  file: FileEntity;

  @ApiProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ApiProperty({ type: PermissionsEnum })
  @Column()
  permission: PermissionsEnum;
}
