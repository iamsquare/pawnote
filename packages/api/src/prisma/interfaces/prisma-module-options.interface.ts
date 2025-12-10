import { type Prisma } from '@repo/db/client';

export type PrismaServiceOptions = Pick<
  Prisma.PrismaClientOptions,
  'errorFormat' | 'log' | 'transactionOptions' | 'omit' | 'comments'
> & {
  connectionString: string;
};
