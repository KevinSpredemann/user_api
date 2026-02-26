import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { CreateUserService } from './domain/services/createUser.service';
import { GetByEmailUserService } from './domain/services/GetByEmailUser.service';
import { GetAllUsersService } from './domain/services/getAllUsers.service';
import { GetUserByIdService } from './domain/services/getUserById.service';
import { UpdateUserService } from './domain/services/updateUser.service';
import { DeleteUserService } from './domain/services/deleteUser.service';
import { REPOSITORY_TOKEN_USER } from './utils/userToken';
import UserRepository from './infra/user.repository';
import { UserController } from './infra/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    CreateUserService,
    GetByEmailUserService,
    GetAllUsersService,
    GetUserByIdService,
    UpdateUserService,
    DeleteUserService,
    {
      provide: REPOSITORY_TOKEN_USER,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [GetByEmailUserService, CreateUserService],
})
export class UsersModule {}
