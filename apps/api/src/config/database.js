import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL es obligatoria.');

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (error) => console.error('Error inesperado de PostgreSQL:', error.message));
