import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { User } from '../entities/user.entity';
export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: UpdateUserDTO): Promise<User>;
  delete(id: number): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}
