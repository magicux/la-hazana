import jwt from 'jsonwebtoken';
export function requireAdmin(req, res, next) {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error();
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    if (payload.role !== 'admin') throw new Error(); req.admin = payload; next();
  } catch { res.status(401).json({ message: 'Sesión de administrador inválida o vencida.' }); }
}
