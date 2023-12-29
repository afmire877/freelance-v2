import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "~/env.mjs";
import postgres from "postgres";
import { sql } from "drizzle-orm";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client);

await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
