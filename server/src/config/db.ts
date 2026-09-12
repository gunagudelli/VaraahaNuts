import { Pool } from "pg";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
  // Vercel serverless functions are short-lived and spin up many concurrent
  // instances - a small max keeps us from exhausting Supabase's connection
  // limit the way a long-running server's larger pool would.
  max: 5,
});

pool.on("error", (err) => {
  logger.error({ err }, "Unexpected error on idle PostgreSQL client");
});
