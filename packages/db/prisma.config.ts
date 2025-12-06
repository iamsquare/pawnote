import 'dotenv/config';

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx scripts/seed.ts',
  },
  datasource: {
    url: `postgresql://${env('DATABASE_USER')}:${env('DATABASE_PASSWORD')}@${env('DATABASE_HOST')}:${env('DATABASE_PORT')}/${env('DATABASE_NAME')}?schema=${env('DATABASE_SCHEMA') ?? 'public'}`,
  },
});
