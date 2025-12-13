# WebServerBase

Base para un servidor Node.js backend profesional utilizando **TypeScript**, **MariaDB** y configuración lista para **Docker**. Este proyecto sirve como plantilla inicial para crear APIs RESTful escalables.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (v18 o superior recomendado)
- **npm** (gestor de paquetes)
- **Docker** y **Docker Compose** (para la base de datos)
- **Git**

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo:

### 1. Clonar el repositorio

```bash
git clone https://github.com/br1cb/webserverbase.git
cd webserverbase
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configuración de Variables de Entorno

El proyecto requiere variables de entorno para funcionar. Utiliza el archivo plantilla `.env.template` para crear tu configuración local:

```bash
cp .env.template .env
```

Edita el archivo `.env` según sea necesario. La configuración por defecto está lista para funcionar con el setup de Docker incluido:

```env
DB_USER=root
DB_PASSWORD=1793
DB_PORT=3306
DB_URL=localhost
DB_NAME=baseapp
```

---

## 🛠 Flow de Desarrollo con Docker

Este proyecto incluye un entorno dockerizado para la base de datos MariaDB. No necesitas instalar MariaDB localmente.

1. **Levantar la base de datos:**
   ```bash
   npm run docker:start
   ```

2. **Iniciar el servidor en modo desarrollo:**
   Este comando compilará el TypeScript y reiniciará el servidor ante cambios (usando `tsc-watch`).
   ```bash
   npm run start:tsc
   ```

---

## 📜 Scripts Disponibles

### Desarrollo

| Comando | Descripción |
|---------|-------------|
| `npm run start:tsc` | **Recomendado**. Compila y corre el servidor, reiniciando al detectar cambios. |
| `npm run build` | Compila el código TypeScript a JavaScript en la carpeta `dist/`. |
| `npm run build:watch` | Solo compila en modo watch (útil si corres el servidor por otro lado). |
| `npm run start` | Ejecuta el código JavaScript compilado en `dist/index.js`. |

### Docker (Base de Datos)

| Comando | Descripción |
|---------|-------------|
| `npm run docker:start` | Levanta los contenedores en segundo plano. |
| `npm run docker:stop` | Detiene los contenedores pero **mantiene los datos**. |
| `npm run docker:logs` | Muestra los logs de la base de datos en tiempo real. |
| `npm run docker:reset` | Destruye contenedores y **borra todos los datos** (Volúmenes). |
| `npm run docker:rebuild` | Reinicio total: borra datos, reconstruye imágenes y levanta todo de cero. |

---

## 📡 API Endpoints

Las rutas están definidas en `src/router.ts`.

| Método | Ruta | Descripción |
|--------|------|-------------|
| **GET** | `/books` | Obtiene la lista de libros (implementado con conexión a DB). |
| **POST** | `/books` | Crea un nuevo libro (requiere body JSON). |
| **GET** | `/authors` | Devuelve una lista mock de autores (ejemplo estático). |
| **GET**| `/users` | Ruta de prueba para servicios de usuarios (Async test). |

---

## 📂 Estructura del Proyecto

```text
src/
├── config/       # Configuraciones (DB, env vars)
├── controllers/  # Lógica de manejo de peticiones (req/res)
├── interfaces/   # Definiciones de tipos TypeScript
├── middlewares/  # Middlewares perzonalizados
├── models/       # Definiciones de tipos/entidades
├── repositories/ # Capa de Acceso a Datos (SQL)
├── routes/       # Definición de rutas específicas
├── services/     # Lógica de negocio
├── utils/        # Utilidades compartidas
├── index.ts      # Punto de entrada del servidor
└── router.ts     # Enrutador principal
```

---

## ✅ TODO List

Tareas pendientes identificadas en el código:

### Router
- [ ] Implementar una interface en `enrutar` que pueda recibir 'extras' (`src/router.ts`).
- [ ] Mejorar el manejo de errores en promesas (reemplazar logs de error genéricos) (`src/router.ts`).

### Users
- [ ] Terminar la implementación del servicio de usuarios, actualmente es un prototipo (`src/services/users.ts`).

### Books
- [ ] Depurar `src/routes/books.route.ts` para verificar el contenido de `params`.
- [ ] Testear y mover la lógica de negocio de las rutas al controlador (`src/routes/books.route.ts`).
- [ ] Implementar soporte para múltiples `search params`.
- [ ] Implementar endpoint para obtener libro por ID (`GET /books/:id`).
