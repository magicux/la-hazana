import { pool } from '../config/database.js';
export const AdminModel = { async findByEmail(email) { const { rows } = await pool.query('SELECT id,name,email,password_hash AS "passwordHash" FROM admin_users WHERE email=$1', [email]); return rows[0]; } };
