import { type Prisma } from '@repo/db/client';

export interface PrismaModuleOptions {
  isGlobal?: boolean;

  prismaServiceOptions?: PrismaServiceOptions;
}

export type PrismaServiceOptions = Pick<
  Prisma.PrismaClientOptions,
  'errorFormat' | 'log' | 'transactionOptions' | 'omit' | 'comments'
> & {
  connectionString: string;
};
