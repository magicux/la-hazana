import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminModel } from '../models/adminModel.js';

export async function login(req, res, next) {
  try {
    const admin = await AdminModel.findByEmail(req.body.email?.trim().toLowerCase());
    if (!admin || !await bcrypt.compare(req.body.password || '', admin.passwordHash)) return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    const token = jwt.sign({ sub: admin.id, role: 'admin' }, process.env.JWT_SECRET || 'dev-secret-change-me', { expiresIn: '8h' });
    res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (error) { next(error); }
}
