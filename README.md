# La Hazaña

Plataforma web responsiva para **La Hazaña**, emprendimiento gastronómico de Peñalolén especializado en lasañas artesanales, focaccias y empanadas. Permite explorar el menú por secciones, conocer opiniones verificadas de Google, armar un pedido y administrar el catálogo desde un panel privado.

## Funcionalidades

- Portada comercial adaptable a móviles y computadores.
- Catálogo dividido en destacados, lasañas, empanadas, focaccia y bebidas.
- Carrito con cantidades, retiro o despacho y registro de pedidos.
- Opiniones verificadas y acceso directo a Google Maps.
- Accesos a WhatsApp, Instagram, teléfono y ubicación.
- Panel administrador protegido para crear, editar, destacar, ocultar y eliminar productos.
- Cambios de precio y catálogo reflejados automáticamente en las tarjetas públicas.
- Persistencia de productos, administradores, pedidos y detalles de pedido en PostgreSQL.
- Publicación automática del frontend en GitHub Pages mediante GitHub Actions.

## Stack técnico

| Capa | Tecnología |
| --- | --- |
| Interfaz | React 19, Vite 7, Bootstrap 5, Bootstrap Icons |
| API | Node.js, Express 5 |
| Base de datos | PostgreSQL 18, driver `pg` |
| Arquitectura | MVC en backend y componentes React en frontend |
| Seguridad | Helmet, CORS por lista permitida, rate limiting, bcrypt y JWT HS256 |
| Automatización | pnpm workspaces y GitHub Actions |
| Hosting estático | GitHub Pages |

## Estructura

```text
apps/
├── api/
│   └── src/
│       ├── config/       # Conexión PostgreSQL
│       ├── controllers/  # Controladores HTTP
│       ├── db/           # Esquema y carga inicial
│       ├── middleware/   # Autenticación y errores
│       ├── models/       # Consultas y reglas de datos
│       └── routes/       # Rutas de la API
└── web/
    └── src/
        ├── assets/       # Fotografías y logotipos
        ├── Admin.jsx     # Panel de administración
        └── App.jsx       # Tienda pública
```

## Instalación local

Requisitos: Node.js 22+, pnpm y PostgreSQL.

```bash
pnpm install
```

Copia `.env.example` como `.env` y configura las variables. Usa una clave `JWT_SECRET` aleatoria de al menos 32 caracteres y credenciales administrativas distintas a las del ejemplo.

```env
PORT=3001
DATABASE_URL=postgresql://usuario:clave@localhost:5432/lahazana
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=una-clave-aleatoria-de-al-menos-32-caracteres
ADMIN_EMAIL=administrador@dominio.cl
ADMIN_PASSWORD=una-clave-administrativa-segura
```

Inicializa la base y ejecuta el proyecto:

```bash
pnpm db:init
pnpm dev
```

- Tienda: `http://localhost:5173`
- Administración: `http://localhost:5173/admin`
- API: `http://localhost:3001`

El script idempotente [schema.sql](apps/api/src/db/schema.sql) crea las tablas y carga el catálogo inicial. El inicializador también crea o actualiza el usuario administrador definido en `.env`.

## GitHub Pages

El workflow `.github/workflows/pages.yml` compila y publica automáticamente el frontend cuando se actualiza `main`.

1. Abre **Settings → Pages** en el repositorio.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Abre **Actions → Publicar frontend en GitHub Pages** para observar o ejecutar el despliegue.

La tienda estática funciona con el catálogo de respaldo incluido. GitHub Pages no ejecuta Node.js ni PostgreSQL. Para conectar el backend publicado, crea en **Settings → Secrets and variables → Actions → Variables** una variable llamada `VITE_API_URL` con la URL pública de la API y vuelve a ejecutar el workflow.

## Backend y base de datos gratuitos

La configuración recomendada para demostración es:

- **Render Free Web Service** para Node.js/Express mediante `render.yaml`.
- **Neon Free** para PostgreSQL persistente.

Pasos:

1. Crea un proyecto gratuito en Neon y copia su cadena de conexión PostgreSQL con SSL.
2. En Render elige **New → Blueprint** y conecta este repositorio.
3. Render detectará `render.yaml`. Completa `DATABASE_URL` con la cadena de Neon y define `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
4. Despliega el Blueprint; el proceso ejecutará `pnpm db:init` antes de iniciar la API.
5. Copia la URL `https://...onrender.com` en la variable `VITE_API_URL` de GitHub Actions.
6. Ejecuta nuevamente el workflow de Pages.

El plan gratuito de Render entra en reposo tras un periodo sin tráfico, por lo que la primera solicitud puede demorar cerca de un minuto. Esta configuración es adecuada para demostraciones, no para producción comercial.

## Seguridad

- Los secretos y `.env` no se versionan.
- Las contraseñas administrativas se almacenan con bcrypt.
- Los endpoints de administración exigen JWT firmado y limitado a 8 horas.
- El inicio de sesión y la API tienen límites de solicitudes.
- Las consultas PostgreSQL utilizan parámetros para reducir riesgos de inyección SQL.
- CORS acepta únicamente los orígenes indicados en `CLIENT_ORIGIN`.
- Antes de producción, rota las contraseñas de ejemplo y usa HTTPS en frontend y API.

## Scripts

- `pnpm dev`: inicia frontend y API.
- `pnpm build`: genera el frontend de producción.
- `pnpm db:init`: crea y actualiza el esquema y los datos iniciales.
- `pnpm start`: inicia la API en modo normal.

## Licencia

Proyecto de La Hazaña. El contenido visual y la marca pertenecen a sus respectivos titulares.
