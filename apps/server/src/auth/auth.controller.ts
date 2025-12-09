import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserModel } from '@repo/api';

import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Request & { user: UserModel }) {
    return req.user;
  }
}
