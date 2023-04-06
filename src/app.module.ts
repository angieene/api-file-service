import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy } from './auth/strategy/google.strategy';
import { configService } from './config/config.service';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { UsersModule } from './users/users.module';
import { PermissionModule } from './permisions/permisions.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    FilesModule,
    FoldersModule,
    UsersModule,
    AuthModule,
    PermissionModule,
    MailerModule,
  ],
  providers: [GoogleStrategy],
})
export class AppModule {}
