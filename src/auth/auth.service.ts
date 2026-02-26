import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetByEmailUserService } from '../users/domain/services/GetByEmailUser.service';
import { CreateUserService } from '../users/domain/services/createUser.service';
import { User } from '../users/domain/entities/user.entity';
import { AuthRegisterDTO } from './dto/authRegister.dto';
import { AuthLoginDTO } from './dto/authLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getByEmailUserService: GetByEmailUserService,
    private readonly createUserService: CreateUserService,
  ) {}

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: AuthRegisterDTO) {
    const existingUser = await this.getByEmailUserService.execute(body.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.createUserService.execute({
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.password,
    });

    return this.generateToken(user);
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.getByEmailUserService.execute(email);

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email or password invalid');
    }

    return this.generateToken(user);
  }
}
