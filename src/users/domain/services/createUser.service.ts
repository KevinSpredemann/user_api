import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('REPOSITORY_TOKEN_USER')
    private readonly userRepositories: IusersRepository.IUsersRepository,
  ) {}
  async execute(data: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepositories.findByEmail(data.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.userRepositories.create({
      ...data,
      password: hashedPassword,
    });
  }
}
