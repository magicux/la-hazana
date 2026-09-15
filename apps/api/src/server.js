import 'dotenv/config';
import { app } from './app.js';
import { logger } from './config/logger.js';

const port = Number(process.env.PORT) || 3001;
// El proceso escucha el puerto que Render asigna dinámicamente.
app.listen(port, () => logger.info('server_started', { port, environment: process.env.NODE_ENV || 'development' }));
