import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as IusersRepository from '../repositories/Iusers.repository';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';

@Injectable()
export class GetByEmailUserService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }
}
