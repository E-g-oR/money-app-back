import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { msg: 'i have logged in' };
  }
  register() {
    return { msg: 'i have registered' };
  }
}
