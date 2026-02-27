import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';
import { UserResponseDTO } from '../dto/userReponse.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly usersRepository: IusersRepository.IUsersRepository,
  ) {}

  async execute(id: number, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.usersRepository.existsByEmail(data.email);

      if (emailExists) {
        throw new BadRequestException('Email already in use');
      }
    }

    const updatedUser = await this.usersRepository.update(id, data);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
      message: 'User updated successfully',
    };
  }
}
