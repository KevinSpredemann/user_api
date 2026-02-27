import { Inject, Injectable } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';

@Injectable()
export class ExistsByEmailService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(email: string): Promise<boolean> {
    const user = await this.usersRepository.findByEmail(email);
    return !!user;
  }
}
