import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AuthDto, RegisterDto } from "src/dto/auth";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Payload, Tokens } from "src/types";

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  login = async (body: AuthDto): Promise<Tokens> => {
    // find the user
    const user = await this.getUserByEmail(body.email);
    // compare passwords hash
    const isValid = await argon.verify(user.hash, body.password);

    if (!isValid) {
      throw new ForbiddenException(`Invalid password`);
    }
    // return the token
    const tokens = await this.getTokens({ sub: user.id, email: user.email });
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  };

  register = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterDto): Promise<Tokens> => {
    // generate hash for the users password
    const hash = await argon.hash(password);
    // create a new user and return
    return this.createUser({ email, hash, firstName, lastName });
  };

  refreshTokens = async (payload: Payload) => {
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(payload.sub, tokens.refresh_token);
    return tokens;
  };

  logout = async (userId: number) => {
    await this.db.user.updateMany({
      where: {
        id: userId,
        refreshHash: {
          not: null,
        },
      },
      data: {
        refreshHash: null,
      },
    });
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
      const tokens = await this.getTokens({ sub: user.id, email: user.email });
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          "User with given credentials already exists.",
        );
      }
      throw err;
    }
  };

  updateRefreshToken = async (userId: number, token: string) => {
    const refreshHash = await argon.hash(token);
    const updatedUser = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshHash,
      },
    });
    return updatedUser;
  };

  getTokens = async (payload: Payload): Promise<Tokens> => {
    const a = this.jwt.signAsync(payload, {
      expiresIn: 60 * 15,
      secret: this.config.get("JWT_SECRET"),
    });
    const r = this.jwt.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * 7,
      secret: this.config.get("REFRESH_SECRET"),
    });

    const [ac, rt] = await Promise.all([a, r]);
    return {
      access_token: ac,
      refresh_token: rt,
    };
  };

  getUserByEmail = async (email: string) => {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  };

  deleteUserHash = ({ hash, ...user }: User) => user;
}
