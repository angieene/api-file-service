import { Module } from '@nestjs/common';
import { FoldesService } from './folders.service';
import { FoldesController } from './folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderEntity } from './entities/folders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FolderEntity])],
  controllers: [FoldesController],
  providers: [FoldesService],
  exports: [FoldesService],
})
export class FoldersModule {}
