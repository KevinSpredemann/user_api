import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/domain/entities/user.entity';
import { AuthLoginDTO } from './dto/authLogin.dto';
import { GetByEmailWithPasswordUserService } from '../users/domain/services/getByEmailWithPasswordUser.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getByEmailWithPasswordUserService: GetByEmailWithPasswordUserService,
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

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.getByEmailWithPasswordUserService.execute(email);

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
