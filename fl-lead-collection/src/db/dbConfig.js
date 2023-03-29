import pg from "pg"
const { Pool } = pg

export const pool = new Pool({
  user: "florianlaurent",
  host: "localhost",
  database: "florianlaurent",
  password: "florianlaurent",
  port: 5432,
})