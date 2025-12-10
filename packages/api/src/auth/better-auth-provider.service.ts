import { Injectable } from '@nestjs/common';
import { Auth, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { bearer } from 'better-auth/plugins';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BetterAuthProviderService {
  private readonly auth: Auth;

  constructor(private readonly prisma: PrismaService) {
    this.auth = betterAuth({
      url: process.env.BETTER_AUTH_URL,
      secret: process.env.BETTER_AUTH_SECRET,
      basePath: '/better-auth',
      plugins: [bearer()],
      database: prismaAdapter(this.prisma, {
        provider: 'postgresql',
      }),
      emailAndPassword: { requireEmailVerification: false, enabled: true, minPasswordLength: 8, maxPasswordLength: 32 },
      trustedOrigins: ['http://localhost:3000'],
    });
  }

  getAuth() {
    return this.auth;
  }
}
