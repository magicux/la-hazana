import { randomUUID } from 'node:crypto';
import { logger } from '../config/logger.js';

/** Registra el resultado y duración de cada solicitud sin almacenar su cuerpo. */
export function requestLogger(req, res, next) {
  const startedAt = performance.now();
  req.requestId = req.headers['rndr-id'] || randomUUID();
  res.setHeader('X-Request-Id', req.requestId);

  res.on('finish', () => {
    const context = {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl.split('?')[0],
      status: res.statusCode,
      durationMs: Math.round(performance.now() - startedAt),
    };
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warning' : 'info';
    logger[level]('http_request_completed', context);
  });
  next();
}
