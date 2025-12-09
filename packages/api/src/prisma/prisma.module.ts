import { DynamicModule, Global, Module } from '@nestjs/common';

import { PrismaModuleOptions } from './interfaces';
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useValue: options.prismaServiceOptions,
        },
      ],
    };
  }
}
