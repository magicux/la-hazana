/**
 * Registrador JSON sin dependencias externas.
 * Render interpreta cada línea de stdout/stderr como un evento consultable. Nunca
 * se deben incluir contraseñas, tokens, cabeceras Authorization ni datos completos
 * de clientes en `context`.
 */
function write(level, event, context = {}) {
  const entry = { timestamp: new Date().toISOString(), level, service: 'la-hazana-api', event, ...context };
  const output = JSON.stringify(entry);
  (level === 'error' ? console.error : level === 'warning' ? console.warn : console.log)(output);
}

export const logger = {
  info: (event, context) => write('info', event, context),
  warning: (event, context) => write('warning', event, context),
  error: (event, context) => write('error', event, context),
};
