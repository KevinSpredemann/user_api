import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';
import { UserResponseDTO } from '../dto/userReponse.dto';

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(id: number): Promise<UserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    };
  }
}
