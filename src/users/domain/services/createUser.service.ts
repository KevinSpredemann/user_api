import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as IusersRepository from '../repositories/Iusers.repository';
import { CreateUserDTO } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { REPOSITORY_TOKEN_USER } from '../../utils/userToken';
import { UserResponseDTO } from '../dto/userReponse.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(REPOSITORY_TOKEN_USER)
    private readonly userRepositories: IusersRepository.IUsersRepository,
  ) {}
  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.userRepositories.existsByEmail(data.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepositories.create({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      message: 'User created successfully',
    };
  }
}
