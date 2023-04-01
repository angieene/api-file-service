import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedFileEntity } from './entities/shared-file.entity';
import { SharedFilesController } from './shared-files.controller';
import { SharedFilesService } from './shared-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([SharedFileEntity])],
  controllers: [SharedFilesController],
  providers: [SharedFilesService],
  exports: [SharedFilesService],
})
export class SharedFilesModule {}
