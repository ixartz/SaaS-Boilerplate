import path from 'node:path';

import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePg, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { Client } from 'pg';

import * as schema from '@/models/Schema';

import { Env } from './Env';

type GlobalDbState = {
  pgClient?: Client;
  pgDrizzle?: NodePgDatabase<typeof schema>;
  pgliteClient?: PGlite;
  pgliteDrizzle?: PgliteDatabase<typeof schema>;
};

const globalDbState = globalThis as typeof globalThis & { __db?: GlobalDbState };

if (!globalDbState.__db) {
  globalDbState.__db = {};
}

let drizzle;

if (Env.DATABASE_URL) {
  if (!globalDbState.__db.pgClient) {
    const client = new Client({
      connectionString: Env.DATABASE_URL,
    });
    await client.connect();

    globalDbState.__db.pgClient = client;
    globalDbState.__db.pgDrizzle = drizzlePg(client, { schema });
  }

  drizzle = globalDbState.__db.pgDrizzle!;

  if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
    await migratePg(drizzle, {
      migrationsFolder: path.join(process.cwd(), 'migrations'),
    });
  }
} else {
  if (!globalDbState.__db.pgliteClient) {
    const client = new PGlite();
    await client.waitReady;

    globalDbState.__db.pgliteClient = client;
    globalDbState.__db.pgliteDrizzle = drizzlePglite(client, { schema });
  }

  drizzle = globalDbState.__db.pgliteDrizzle!;
  await migratePglite(drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
}

export const db = drizzle;
