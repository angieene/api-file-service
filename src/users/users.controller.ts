import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOperation({ summary: 'Get user by id' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   type: UserEntity,
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'User not found',
  // })
  // @Get(':userId')
  // async findOne(
  //   @Param('userId', IdValidationPipe) userId: string,
  // ): Promise<UserEntity> {
  //   return this.usersService.findOneById(userId);
  // }
}
