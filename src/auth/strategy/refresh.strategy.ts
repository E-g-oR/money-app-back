import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("REFRESH_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: number; email: string }) {
    console.log("\n req: ", req, "\n payload:", payload);

    const refreshToken = req.get("authorization").split(" ")[1];

    console.log("\n [refreshToken]: ", refreshToken);

    // console.log({ payload });
    const { hash, ...user } = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    return {
      ...user,
      refreshToken,
    };
  }
}
