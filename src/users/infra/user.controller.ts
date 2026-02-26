import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserService } from '../domain/services/createUser.service';
import { UpdateUserService } from '../domain/services/updateUser.service';
import { GetAllUsersService } from '../domain/services/getAllUsers.service';
import { GetByEmailUserService } from '../domain/services/GetByEmailUser.service';
import { GetUserByIdService } from '../domain/services/getUserById.service';
import { DeleteUserService } from '../domain/services/deleteUser.service';
import { CreateUserDTO } from '../domain/dto/createUser.dto';
import { JwtAuthGuard } from '../../auth/guards/jwtAuth.guard';
import { UpdateUserDTO } from '../domain/dto/updateUser.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private getAllUserService: GetAllUsersService,
    private getByEmailUserService: GetByEmailUserService,
    private getByIdUserService: GetUserByIdService,
    private deleteUserService: DeleteUserService,
  ) {}

  @Get()
  getAll() {
    return this.getAllUserService.execute();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.getByIdUserService.execute(id);
  }

  @Get()
  getByEmail(@Body('email') email: string) {
    return this.getByEmailUserService.execute(email);
  }

  @Post()
  create(@Body() body: CreateUserDTO) {
    console.log(body);
    return this.createUserService.execute(body);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.deleteUserService.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDTO) {
    return this.updateUserService.execute(id, body);
  }
}
