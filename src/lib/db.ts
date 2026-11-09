import postgres from "postgres";

// Single source of truth for the CRM: a Postgres table where each lead is one
// row with a JSONB `data` blob. Storing the whole lead as JSON means adding a
// new field never needs a schema change / migration — just include it when
// saving. The app is the only interface; no spreadsheet, no Apps Script.

// Accept whatever name Vercel/Neon used for the pooled connection string.
const url = (
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_PRISMA_URL ||
  ""
).trim();
export const dbConfigured = () => !!url;

type Sql = ReturnType<typeof postgres>;
let _sql: Sql | null = null;
function db(): Sql {
  if (!_sql) {
    // Managed Postgres (Neon/Vercel/Supabase) needs SSL; a plain local DB doesn't.
    const needsSsl = /sslmode=require/i.test(url) || /neon\.|supabase\.|amazonaws\.|vercel|pooler/i.test(url);
    // Pooled serverless connection: disable prepared statements.
    _sql = postgres(url, { ssl: needsSsl ? "require" : false, prepare: false, max: 1 });
  }
  return _sql;
}

let schemaReady = false;
async function ensureSchema() {
  if (schemaReady) return;
  await db()`CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    data JSONB NOT NULL DEFAULT '{}'::jsonb
  )`;
  schemaReady = true;
}

export type LeadData = Record<string, unknown>;

/** All leads, newest-first by id, each shaped like the CRM's Lead (id -> row). */
export async function listLeads(): Promise<Array<LeadData & { row: number }>> {
  await ensureSchema();
  const rows = await db()<{ id: number; data: LeadData }[]>`
    SELECT id, data FROM leads ORDER BY id ASC`;
  return rows.map((r) => ({ ...r.data, row: r.id }));
}

export async function countLeads(): Promise<number> {
  await ensureSchema();
  const rows = await db()<{ n: number }[]>`SELECT count(*)::int AS n FROM leads`;
  return rows[0]?.n ?? 0;
}

/** Insert a new lead; `row`/`id` keys in the payload are ignored. Returns new id. */
export async function insertLead(data: LeadData): Promise<number> {
  await ensureSchema();
  const clean: LeadData = { ...data };
  delete clean.row;
  delete clean.id;
  const sql = db();
  const rows = await sql<{ id: number }[]>`
    INSERT INTO leads (data) VALUES (${sql.json(clean as postgres.JSONValue)}) RETURNING id`;
  return rows[0].id;
}

/** Merge `patch` into a lead's JSON (top-level keys replace), by id. */
export async function updateLead(id: number, patch: LeadData): Promise<void> {
  await ensureSchema();
  const sql = db();
  await sql`
    UPDATE leads
    SET data = data || ${sql.json(patch as postgres.JSONValue)}, updated_at = now()
    WHERE id = ${id}`;
}
