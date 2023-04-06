import { Injectable } from '@nestjs/common';

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
