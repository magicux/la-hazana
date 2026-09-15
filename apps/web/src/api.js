const configuredBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
export const apiUrl = (path) => configuredBase ? `${configuredBase}${path}` : path;
