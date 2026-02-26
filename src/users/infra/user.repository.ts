import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../domain/repositories/Iusers.repository';
import { Repository } from 'typeorm';
import { User } from '../domain/entities/user.entity';
import { CreateUserDTO } from '../domain/dto/createUser.dto';
import { UpdateUserDTO } from '../domain/dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async create(data: CreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    await this.repository.update(id, data);

    const updatedUser = await this.repository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UserRepository;
