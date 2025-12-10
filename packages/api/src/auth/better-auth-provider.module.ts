import { Module } from '@nestjs/common';

import { BetterAuthProviderService } from './better-auth-provider.service';

@Module({
  providers: [BetterAuthProviderService],
  exports: [BetterAuthProviderService],
})
export class BetterAuthProviderModule {}
