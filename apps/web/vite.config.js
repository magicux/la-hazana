import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // La base relativa permite publicar el mismo build dentro de `/la-hazana/`.
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:3001' },
  },
});
