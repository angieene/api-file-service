import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateFromEmail } from 'unique-username-generator';

import { UserRepository } from '../users/user.repository';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) {}

  generateJwt(payload: string | object | Buffer) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: RegisterUserDto) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userRepository.findOneByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const newUser = await this.userRepository.create(registerUserDto);
    newUser.username = generateFromEmail(registerUserDto.email, 5);

    await this.userRepository.save(newUser);

    return this.generateJwt({
      sub: newUser.id,
      email: newUser.email,
    });
  }
}
