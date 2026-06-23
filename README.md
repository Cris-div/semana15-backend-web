# Semana 15 Backend Web

Backend para la tarea de e-commerce con autenticacion, roles, productos y categorias.

## Requerimientos cubiertos

- Tabla `users` con roles `CUSTOMER` y `ADMIN`.
- Login y registro con password encriptado.
- Token JWT para rutas protegidas.
- Validacion de rol `ADMIN` para crear, editar y eliminar productos.
- Validacion de rol `ADMIN` para crear categorias.
- Tabla `categories`.
- Campos `categoryId` e `imageUrl` en `products`.
- CORS configurable para el dominio del frontend en Vercel.

## Variables de entorno

Copia `.env.example` y configura los valores reales:

```env
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
PORT=3001
JWT_SECRET=change-this-secret
FRONTEND_URL=https://your-frontend.vercel.app
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

En Render, agrega `FRONTEND_URL` o `CORS_ORIGINS` con el dominio real de Vercel.

## Comandos

```bash
npm install
npm run dev
npm run seed
npm start
```

## Credenciales de prueba

Despues de ejecutar `npm run seed`:

- CUSTOMER: `customer@test.com` / `Password123`
- ADMIN: `admin@test.com` / `Password123`
