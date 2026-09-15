import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

try {
  // El esquema es idempotente: puede ejecutarse en cada despliegue sin borrar datos.
  const sql = await readFile(fileURLToPath(new URL('./schema.sql', import.meta.url)), 'utf8');
  await pool.query(sql);
  const email = process.env.ADMIN_EMAIL || 'admin@lahazana.cl';
  const password = process.env.ADMIN_PASSWORD || 'Cambiar123!';
  const passwordHash = await bcrypt.hash(password, 12);
  await pool.query(
    `INSERT INTO admin_users (name, email, password_hash) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    ['Administración La Hazaña', email.toLowerCase(), passwordHash],
  );
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), level: 'info', service: 'la-hazana-api', event: 'database_initialized' }));
} finally {
  await pool.end();
}
