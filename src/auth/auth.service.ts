import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}
  login() {
    return { msg: 'i have logged in' };
  }
  register() {
    return { msg: 'i have registered' };
  }
}
