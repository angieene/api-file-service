import { Injectable } from '@nestjs/common';

import { IPositiveRequest } from 'src/core/types/main';

import { PaginateUsersDto } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  // async findOneById(userId: string): Promise<UserEntity> {
  //   return this.userRepository.findOneById(userId);
  // }

  // async findOneByEmail(userEmail: string): Promise<UserEntity> {
  //   return this.userRepository.findOnlyPassword(userEmail);
  // }
}
