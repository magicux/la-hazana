// En producción apunta a Render; en desarrollo conserva las rutas relativas del proxy Vite.
const configuredBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
export const apiUrl = (path) => configuredBase ? `${configuredBase}${path}` : path;
