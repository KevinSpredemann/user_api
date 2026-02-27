import { Inject, Injectable } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';
import { User } from '../entities/user.entity';

@Injectable()
export class GetByEmailWithPasswordUserService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }
}
