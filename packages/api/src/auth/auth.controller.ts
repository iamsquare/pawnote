import { Body, Controller, Headers, Post, Response } from '@nestjs/common';
import { AllowAnonymous, AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';

import { SignInDto, SignUpDto } from '../dto/auth/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly betterAuthService: BetterAuthService) {}

  @Post('sign-up')
  @AllowAnonymous()
  signUp(@Body() signUpDto: SignUpDto, @Headers() headers: Headers) {
    return this.betterAuthService.api.signUpEmail({
      body: {
        name: signUpDto.name,
        email: signUpDto.email,
        password: signUpDto.password,
      },
      headers,
    });
  }

  @Post('sign-in')
  @AllowAnonymous()
  signIn(@Body() signInDto: SignInDto, @Headers() headers: Headers) {
    return this.betterAuthService.api.signInEmail({
      body: {
        email: signInDto.email,
        password: signInDto.password,
      },
      headers,
    });
  }

  @Post('sign-out')
  signOut(@Headers() headers: Headers) {
    return this.betterAuthService.api.signOut({ headers });
  }
}
