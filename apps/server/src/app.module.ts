import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaModule } from '@repo/api';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${process.env.DATABASE_SCHEMA ?? 'public'}`,
      },
    }),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) =>
        new PrismaClientExceptionFilter(httpAdapter),
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
