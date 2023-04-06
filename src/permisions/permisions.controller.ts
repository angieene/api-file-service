import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { User } from 'src/users/decorator/user.decorator';
import { CreatePermissionDto } from './dto/create-permision.dto';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionService } from './permisions.service';

@Controller('permisions')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create permission' })
  @ApiResponse({ type: PermissionEntity })
  @UseGuards(AuthGuard('jwt'))
  @Post('create-permission')
  async createPermission(
    @Body() createPermisionDto: CreatePermissionDto,
    @User('id') userId: string,
  ) {
    return this.permissionsService.createPermission(createPermisionDto, userId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Find file permission' })
  @ApiResponse({ type: PermissionEntity })
  @UseGuards(AuthGuard('jwt'))
  @Get('file-permissions/:fileId')
  async findAll(@Param('fileId') fileId: string, @User('id') userId: string) {
    return await this.permissionsService.findAll(fileId, userId);
  }

  // @ApiBearerAuth('JWT-auth')
  // @ApiOperation({ summary: 'Update file permission' })
  // @ApiResponse({ type: PermissionEntity })
  // @UseGuards(AuthGuard('jwt'))
  // @Patch('update/:permissionId')
  // update(
  //   @Param('permissionId') permissionId: string,
  //   @Body() updatePermisionDto: CreatePermissionDto,
  // ) {
  //   return this.permissionsService.update(permissionId, updatePermisionDto);
  // }

  // @Delete('delete/:permissionId')
  // remove(@Param('permissionId') permissionId: string) {
  //   return this.permissionsService.remove(permissionId);
  // }
}
