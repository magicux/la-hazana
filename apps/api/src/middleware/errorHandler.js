import { logger } from '../config/logger.js';

/** Última barrera de Express: registra contexto técnico y devuelve un mensaje seguro. */
export function errorHandler(error, req, res, _next) {
  logger.error('request_failed', { requestId: req.requestId, method: req.method, path: req.originalUrl.split('?')[0], message: error.message, stack: process.env.NODE_ENV === 'production' ? undefined : error.stack });
  res.status(500).json({ message: error.message || 'No pudimos procesar la solicitud.' });
}
