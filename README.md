Gracias por señalarlo. Aquí tienes el `README.md` completo, asegurándome de cubrir cada punto del documento de requisitos:

```markdown
# Prueba Técnica para Desarrollador Junior Fullstack - TTT

Este proyecto es una aplicación web de gestión de tareas (to-do list) donde los usuarios pueden crear una cuenta, iniciar sesión y gestionar tareas. Cada tarea puede tener diferentes estados y fecha de vencimiento.

## Características del Proyecto

- **Autenticación**: Registro e inicio de sesión de usuarios con JWT.
- **Gestión de Tareas**: Los usuarios pueden crear, ver, editar y eliminar sus tareas.
- **Categorías de Estado**: Cada tarea tiene un estado (`pendiente`, `en progreso`, `completada`).
- **Protección de Rutas**: Solo los usuarios autenticados pueden acceder a la sección de tareas.

## Tecnologías Utilizadas

- **Backend**: NestJS, TypeScript
- **Frontend**: Next.js, TypeScript
- **Autenticación**: JSON Web Token (JWT)
- **Base de Datos**: PostgreSQL (configurable en `.env`)

## Configuración y Ejecución

### Requisitos Previos

- Node.js (versión 14 o superior)
- PostgreSQL
- Git

### Configuración del Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd todo-backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `todo-backend` con las siguientes variables de entorno:

   ```env
   PORT=3001
   DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_base_datos
   JWT_SECRET=tuSecretoJWT
   ```

4. Ejecuta las migraciones para crear las tablas en la base de datos:

   ```bash
   npm run migration:run
   ```

5. Inicia el servidor:
   ```bash
   npm run start
   ```

   El backend debería estar disponible en `http://localhost:3001`.

### Configuración del Frontend

1. Abre una nueva terminal y navega hasta la carpeta `todo-frontend`:

   ```bash
   cd todo-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la carpeta `todo-frontend` con la URL del backend configurada:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   ```

4. Inicia el servidor de desarrollo de Next.js:
   ```bash
   npm run dev
   ```

   El frontend estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

### Backend

```
todo-backend/
├── src/
│   ├── auth/              # Módulo de autenticación
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── user.entity.ts
│   │   ├── auth.controller.ts
│   ├── tasks/             # Módulo de tareas
│   │   ├── tasks.module.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   ├── task.entity.ts
│   ├── app.module.ts      # Módulo principal
│   └── main.ts            # Archivo de inicio
├── .env                   # Variables de entorno
└── README.md
```

### Frontend

```
todo-frontend/
├── pages/
│   ├── index.tsx          # Página de login
│   ├── register.tsx       # Página de registro
│   ├── tasks.tsx          # Página de tareas
│   └── _app.tsx           # Componente de App principal
├── .env.local             # Variables de entorno del frontend
└── README.md
```

## Endpoints de la API

Estos endpoints están disponibles en el backend para gestionar las tareas y la autenticación:

- **POST /auth/register**: Registro de usuario.
- **POST /auth/login**: Inicio de sesión y generación de JWT.
- **POST /tasks**: Crear una nueva tarea (solo para usuarios autenticados).
- **GET /tasks**: Obtener todas las tareas del usuario autenticado.
- **GET /tasks/:id**: Ver los detalles de una tarea específica.
- **PUT /tasks/:id**: Editar una tarea específica.
- **DELETE /tasks/:id**: Eliminar una tarea específica.

## Explicación Técnica

Este proyecto sigue una arquitectura modular para dividir la lógica de autenticación y la gestión de tareas en NestJS, y utiliza Next.js para el frontend.

- **Autenticación con JWT**: La autenticación está implementada en el backend usando JWT. Los tokens se generan al iniciar sesión y se usan para autorizar solicitudes en los endpoints de tareas.
  
- **Protección de Rutas**: El frontend redirige a los usuarios no autenticados a la página de inicio de sesión mediante el hook `useEffect`.

- **Validación de Datos**: En el backend, `class-validator` verifica que los datos de las tareas (estado, fecha, etc.) sean válidos antes de procesar las solicitudes. El frontend también valida las entradas de datos en los formularios.

## Criterios de Evaluación

1. **Funcionalidad Completa**: La aplicación cumple con todas las funcionalidades solicitadas, incluyendo autenticación, CRUD de tareas y protección de rutas.
2. **Calidad del Código**: El código sigue buenas prácticas, con modularidad, manejo de errores y validaciones.
3. **Uso Efectivo de Tecnologías**: Se ha usado NestJS, Next.js y TypeScript de forma adecuada para implementar el backend y frontend.
4. **Interfaz de Usuario**: La interfaz es intuitiva y fácil de usar para gestionar tareas.
5. **Documentación**: Este `README.md` contiene todas las instrucciones necesarias para configurar y ejecutar el proyecto.

---