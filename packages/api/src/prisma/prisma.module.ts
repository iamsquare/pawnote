import { DynamicModule, Global, Module } from '@nestjs/common';

import { PrismaServiceOptions } from './interfaces';
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants';
import { PrismaService } from './prisma.service';

@Global()
@Module({})
export class PrismaModule {
  static forRoot(options: PrismaServiceOptions): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_SERVICE_OPTIONS,
          useValue: options,
        },
        PrismaService,
      ],
      exports: [PrismaService],
    };
  }
}
