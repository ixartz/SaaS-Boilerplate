import { promises as fs } from 'node:fs';
import path from 'node:path';

import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePg, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import { Client } from 'pg';

import * as schema from '@/models/Schema';

import { Env } from './Env';

type GlobalDbState = {
  pgClient?: Client;
  pgDrizzle?: NodePgDatabase<typeof schema>;
  pgliteClient?: PGlite;
  pgliteDrizzle?: PgliteDatabase<typeof schema>;
  pgliteMigrated?: boolean;
};

const globalDbState = globalThis as typeof globalThis & { __db?: GlobalDbState };

if (!globalDbState.__db) {
  globalDbState.__db = {};
}

const MIGRATIONS_FOLDER = path.join(process.cwd(), 'migrations');

let drizzle;

if (process.env.NODE_ENV !== 'production' && Env.DATABASE_URL) {
  if (!globalDbState.__db.pgClient) {
    const client = new Client({
      connectionString: Env.DATABASE_URL,
    });
    await client.connect();

    globalDbState.__db.pgClient = client;
    globalDbState.__db.pgDrizzle = drizzlePg(client, { schema });
  }

  drizzle = globalDbState.__db.pgDrizzle!;

  await migratePg(drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
} else {
  if (!globalDbState.__db.pgliteClient) {
    const client = new PGlite();
    await client.waitReady;

    globalDbState.__db.pgliteClient = client;
    await runPgliteMigrations(client);
    globalDbState.__db.pgliteMigrated = true;
    globalDbState.__db.pgliteDrizzle = drizzlePglite(client, { schema });
  } else if (!globalDbState.__db.pgliteMigrated && globalDbState.__db.pgliteClient) {
    await runPgliteMigrations(globalDbState.__db.pgliteClient);
    globalDbState.__db.pgliteMigrated = true;
  }

  drizzle = globalDbState.__db.pgliteDrizzle!;
}

export const db = drizzle;

async function runPgliteMigrations(client: PGlite) {
  const files = await fs.readdir(MIGRATIONS_FOLDER);
  const sqlFiles = files.filter(file => file.endsWith('.sql')).sort();

  for (const file of sqlFiles) {
    const content = await fs.readFile(path.join(MIGRATIONS_FOLDER, file), 'utf8');
    const statements = content.split('--> statement-breakpoint');

    for (const raw of statements) {
      const statement = raw.trim();
      if (!statement) {
        continue;
      }

      if (/^DO\s+\$\$/i.test(statement)) {
        const innerStatements = statement.match(/ALTER\s+TABLE[\s\S]+?;/gi);
        if (!innerStatements) {
          continue;
        }

        for (const inner of innerStatements) {
          await client.exec(inner);
        }

        continue;
      }

      await client.exec(statement);
    }
  }
}
