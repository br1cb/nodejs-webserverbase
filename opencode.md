# WebServerBase - Node.js Backend Template

## Descripción
Backend en Node.js + TypeScript con arquitectura MERN (Repository Pattern) para gestión de libros.

## Estructura del Proyecto
- **src/**: Código fuente (routes, controllers, services, repositories, models)
- **dist/**: Build compilado con TypeScript
- **src/config/db.ts**: Configuración de conexión a MariaDB
- **src/middlewares/routes-middleware.ts**: Middlewares para rutas

## Tech Stack
- Node.js + TypeScript
- MariaDB (MySQL)
- Docker (docker-compose incluido)

## Scripts Útiles
```bash
npm run build              # Compilar TypeScript
npm run start              # Ejecutar servidor
npm run docker:start       # Levantar con Docker
npm run docker:logs        # Ver logs de Docker
npm run docker:rebuild     # Reconstruir contenedores
```

## Author
Bruno César Barletta - https://github.com/br1cb/webserverbase