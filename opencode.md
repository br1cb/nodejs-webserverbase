# WebServerBase - Node.js Backend Template

## Descripción
Backend en Node.js + TypeScript diseñado con arquitectura robusta utilizando **Repository Pattern** para la gestión de datos. El servidor está optimizado para funcionar con **MariaDB** y está totalmente dockerizado para facilitar el despliegue y desarrollo.

## Arquitectura
El proyecto sigue una estructura modular para separar responsabilidades:
- **Controllers**: Manejan las peticiones HTTP y las respuestas.
- **Services**: Contienen la lógica de negocio.
- **Repositories**: Encapsulan la interacción directa con la base de datos (MariaDB).
- **Routes**: Definen los endpoints de la API.
- **Models**: Definen los tipos y entidades de datos.

## Tech Stack
- Node.js + TypeScript
- MariaDB (MySQL)
- Docker & Docker Compose

## Scripts Disponibles

### Desarrollo y Build
| Comando | Descripción |
| :--- | :--- |
| `npm run build` | Compila el código TypeScript a JavaScript en `dist/`. |
| `npm run build:watch` | Compila en modo watch. |
| `npm run start` | Ejecuta el servidor desde el código compilado (`dist/index.js`). |
| `npm run start:tsc` | **Recomendado**. Compila y ejecuta con `tsc-watch` (reinicio en caliente). |

### Docker (Gestión de Base de Datos)
| Comando | Descripción |
| :--- | :--- |
| `npm run docker:start` | Levanta los contenedores. |
| `npm run docker:stop` | Detiene los contenedores (persiste datos). |
| `npm run docker:logs` | Visualiza los logs en tiempo real. |
| `npm run docker:reset` | Destruye contenedores y volúmenes (borra datos). |
| `npm run docker:rebuild` | Reinicio total desde cero (reconstruye imágenes y borra datos). |

## Testing
El proyecto cuenta con una suite de pruebas unitarias utilizando el módulo nativo de Node.js (`node:test`) y *mocks* para simular dependencias (servicios/repositorios). 

Ejecución de tests:
```bash
npm test
```

## Tareas Pendientes (TODOs)

### Router
- [x] Implementar una interface en `enrutar` que pueda recibir 'extras' (`src/router.ts`).
- [x] Mejorar el manejo de errores en promesas (`src/router.ts`).

### Users
- [x] Terminar la implementación del servicio de usuarios (`src/services/users.ts`).

### Books
- [x] Depurar `src/routes/books.route.ts` para verificar el contenido de `params`.
- [x] Mover la lógica de negocio de las rutas al controlador (`src/routes/books.controller.ts`).
- [ ] Implementar soporte para múltiples `search params`.
- [x] Implementar endpoint para obtener libro por ID (`GET /books/:id`).

## Author
Bruno César Barletta - https://github.com/br1cb/webserverbase
