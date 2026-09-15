import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/adminModel.js';
import { logger } from '../config/logger.js';

/** Valida credenciales bcrypt y entrega una sesión JWT de ocho horas. */
export async function login(req, res, next) {
  try {
    const admin = await AdminModel.findByEmail(req.body.email?.trim().toLowerCase());
    if (!admin || !await bcrypt.compare(req.body.password || '', admin.passwordHash)) {
      logger.warning('admin_login_failed', { requestId: req.requestId });
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET debe contener al menos 32 caracteres.');
    const token = jwt.sign({ sub: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h', algorithm: 'HS256' });
    logger.info('admin_login_succeeded', { requestId: req.requestId, adminId: admin.id });
    res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (error) { next(error); }
}
