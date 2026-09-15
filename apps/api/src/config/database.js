import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/lahazana',
});

pool.on('error', (error) => console.error('Error inesperado de PostgreSQL:', error.message));
