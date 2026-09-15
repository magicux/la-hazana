# La Hazaña

Sitio de venta responsivo para La Hazaña, construido con React, Vite, Bootstrap, Node.js/Express y PostgreSQL bajo arquitectura MVC.

## Puesta en marcha

1. Crea una base PostgreSQL llamada `lahazana`.
2. Copia `.env.example` como `.env` y ajusta `DATABASE_URL` si corresponde.
3. Instala dependencias con `pnpm install` (o `npm install`).
4. Inicializa tablas y catálogo con `pnpm db:init`.
5. Inicia frontend y API con `pnpm dev`.

La web queda en `http://localhost:5173` y la API en `http://localhost:3001`.

## Administración

Abre `http://localhost:5173/admin`. El usuario inicial se crea al ejecutar `pnpm db:init` usando `ADMIN_EMAIL` y `ADMIN_PASSWORD` desde `.env`. Cambia también `JWT_SECRET` antes de usar el sistema fuera del entorno local.

En GitHub Pages, la vista del administrador puede abrirse agregando `?admin` al final de la URL. El inicio de sesión y los cambios de catálogo solo funcionarán cuando `VITE_API_URL` apunte a una API Node.js publicada; Pages no ejecuta Node.js ni PostgreSQL.

## Publicación en GitHub Pages

El workflow `.github/workflows/pages.yml` compila y publica el frontend automáticamente con cada cambio en `master`.

1. En GitHub abre **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Abre la pestaña **Actions**, elige **Publicar frontend en GitHub Pages** y pulsa **Run workflow** si todavía no se ejecutó.

GitHub Pages solo publica la interfaz estática. Para pedidos, administración y PostgreSQL, publica `apps/api` en un servicio Node.js y configura allí `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `CLIENT_ORIGIN`.

## Arquitectura

- `apps/web`: vista React + Bootstrap.
- `apps/api/src/models`: acceso y reglas de datos PostgreSQL.
- `apps/api/src/controllers`: coordinación de solicitudes y respuestas.
- `apps/api/src/routes`: rutas HTTP.
- `apps/api/src/db`: esquema e inicialización del catálogo.
