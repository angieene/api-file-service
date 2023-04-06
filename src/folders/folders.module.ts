import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { FoldesService } from './folders.service';
import { FoldesController } from './folders.controller';
import { FolderEntity } from './entities/folders.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([FolderEntity]), UsersModule, FilesModule],
  controllers: [FoldesController],
  providers: [FoldesService],
  exports: [FoldesService],
})
export class FoldersModule {}
