import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import * as IusersRepository from '../repositories/Iusers.repository';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(id: number, data: UpdateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.update(id, data);
  }
}
