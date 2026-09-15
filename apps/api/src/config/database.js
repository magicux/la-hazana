import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
// La API no arranca sin una conexión explícita; así evitamos usar una BD equivocada.
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL es obligatoria.');

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Los errores de conexiones inactivas se notifican aunque no pertenezcan a una consulta.
pool.on('error', (error) => console.error(JSON.stringify({ timestamp: new Date().toISOString(), level: 'error', service: 'la-hazana-api', event: 'postgres_pool_error', message: error.message })));
