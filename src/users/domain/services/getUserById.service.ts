import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as IusersRepository from '../repositories/Iusers.repository';

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject('REPOSITORY_TOKEN_USER')
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
