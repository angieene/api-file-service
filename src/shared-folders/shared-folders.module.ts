import { Module } from '@nestjs/common';
import { SharedFoldersService } from './shared-folders.service';
import { SharedFoldersController } from './shared-folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedFolderEntity } from './entities/shared-folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SharedFolderEntity])],
  controllers: [SharedFoldersController],
  providers: [SharedFoldersService],
  exports: [SharedFoldersService],
})
export class SharedFoldersModule {}
