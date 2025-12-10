import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule, AuthService as BetterAuthService } from '@thallesp/nestjs-better-auth';

import { AuthController } from './auth.controller';
import { BetterAuthProviderModule } from './better-auth-provider.module';
import { BetterAuthProviderService } from './better-auth-provider.service';

@Module({
  imports: [
    BetterAuthProviderModule,
    BetterAuthModule.forRootAsync({
      imports: [BetterAuthProviderModule],
      inject: [BetterAuthProviderService],
      useFactory: (betterAuthProvider: BetterAuthProviderService) => ({
        auth: betterAuthProvider.getAuth(),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [BetterAuthService],
  exports: [BetterAuthProviderModule, BetterAuthService],
})
export class AuthModule {}
