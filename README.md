# WebServerBase

Base para un servidor Node.js con TypeScript y soporte para levantar contenedores Docker.

---

## Scripts de NPM

### Desarrollo y build

| Script | Descripción |
|--------|-------------|
| `npm run build` | Compila el proyecto TypeScript a JavaScript en la carpeta `dist/`. |
| `npm run build:watch` | Compila el proyecto en modo watch, recompilando automáticamente cuando hay cambios. |
| `npm run test` | Script de prueba por defecto (sin tests implementados). |
| `npm run start` | Ejecuta el servidor Node.js desde la carpeta `dist/`. |
| `npm run start:tsc` | Compila el proyecto y ejecuta el servidor automáticamente cuando la compilación es exitosa (usa `tsc-watch`). |

---

### Docker

Se asume que hay un archivo `docker-compose.yml` en la raíz del proyecto.  

| Script | Descripción |
|--------|-------------|
| `npm run docker:start` | Levanta los contenedores definidos en `docker-compose.yml` en segundo plano. |
| `npm run docker:stop` | Baja los contenedores pero **mantiene los volúmenes** (los datos de la base de datos no se pierden). |
| `npm run docker:logs` | Muestra los logs de los contenedores en tiempo real. |
| `npm run docker:reset` | Baja los contenedores y **borra los volúmenes**, dejando la base de datos limpia. ⚠️ Todos los datos se eliminan. |
| `npm run docker:rebuild` | Baja los contenedores, borra los volúmenes y vuelve a levantar los servicios desde cero, reconstruyendo imágenes si es necesario. Ideal para reiniciar el entorno limpio. |

---

## Notas

- Docker Compose debe estar instalado a nivel del sistema.
- `docker-compose.yml` define los servicios, puertos y volúmenes para MariaDB u otros contenedores que quieras agregar.
- Usar `docker:reset` o `docker:rebuild` eliminará todos los datos persistidos en los volúmenes de MariaDB.
