import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { IPositiveRequest } from 'src/core/types/main';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<IPositiveRequest> {
    const savedUser = await this.userEntity.insert(user);

    if (!savedUser) throw new BadRequestException('Failed to save user');

    return { success: true };
  }

  async create(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const newUser = this.userEntity.create(registerUserDto);

    if (!newUser) throw new BadRequestException('Couldn`t create user');

    return newUser;
  }

  async findOneById(userId: string): Promise<UserEntity> {
    const searchUser = await this.userEntity.findOne({ where: { id: userId } });

    if (!searchUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return searchUser;
  }

  async findOneByEmail(userEmail: string): Promise<UserEntity> {
    const user = await this.userEntity.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      return null;
    }
    return user;
  }
}
