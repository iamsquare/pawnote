import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@repo/db/client';

export const prisma: PrismaClient = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${process.env.DATABASE_SCHEMA ?? 'public'}`,
  }),
});
