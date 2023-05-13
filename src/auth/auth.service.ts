import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto, RegisterDto } from 'src/dto/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  login = async (body: AuthDto) => {
    // find the user
    const user = await this.getUserByEmail(body.email);
    // compare passwords hash
    const isValid = await argon.verify(user.hash, body.password);
    if (!isValid) {
      throw new ForbiddenException(`Invalid password`);
    }
    // return the token
    const token = await this.signToken({
      sub: user.id,
      email: user.email,
    });
    return { token };
  };

  register = async ({ email, password, firstName, lastName }: RegisterDto) => {
    // generate hash for the users password
    const hash = await argon.hash(password);
    // create a new user and return
    return this.createUser({ email, hash, firstName, lastName });
  };

  getUserByEmail = async (email: string) => {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  };

  createUser = async (userBody: {
    email: string;
    hash: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const user = await this.db.user.create({
        data: userBody,
      });

      return this.deleteUserHash(user);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          'User with given credentials already exists.',
        );
      }
      throw err;
    }
  };

  deleteUserHash = ({ hash, ...user }: User) => user;

  signToken = (payload: { sub: number; email: string }) =>
    this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
}
