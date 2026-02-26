import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as IusersRepository from '../repositories/Iusers.repository';

@Injectable()
export class GetAllUsersService {
  constructor(
    @Inject('REPOSITORY_TOKEN_USER')
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
