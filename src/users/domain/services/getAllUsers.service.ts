import { Inject, Injectable } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';
import { UserResponseDTO } from '../dto/userReponse.dto';

@Injectable()
export class GetAllUsersService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    }));
  }
}
