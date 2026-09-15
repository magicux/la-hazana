export function errorHandler(error, _req, res, _next) {
  console.error(error);
  res.status(500).json({ message: error.message || 'No pudimos procesar la solicitud.' });
}
