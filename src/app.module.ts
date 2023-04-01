import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/strategy/google.strategy';
import { configService } from './config/config.service';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { SharedFilesModule } from './shared-files/shared-files.module';
import { SharedFoldersModule } from './shared-folders/shared-folders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FilesModule,
    FoldersModule,
    SharedFilesModule,
    SharedFoldersModule,
    UsersModule,
    AuthModule,
  ],
  providers: [GoogleStrategy],
})
export class AppModule {}
