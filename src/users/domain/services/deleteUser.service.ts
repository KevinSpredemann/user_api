import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('REPOSITORY_TOKEN_USER')
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
  }
}
