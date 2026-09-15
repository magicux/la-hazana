import jwt from 'jsonwebtoken';
export function requireAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
    if (payload.role !== 'admin') throw new Error(); req.admin = payload; next();
  } catch { res.status(401).json({ message: 'Sesión de administrador inválida o vencida.' }); }
}
