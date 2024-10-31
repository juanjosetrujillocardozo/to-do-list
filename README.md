# Proyecto de Lista de Tareas (To-Do List)

Este proyecto implementa una aplicación web para la gestión de tareas utilizando **NestJS** y **Next.js**. La aplicación permite a los usuarios autenticarse, crear, ver, actualizar y eliminar tareas.

## Estructura del Proyecto
- **Backend:** NestJS con TypeScript y TypeORM.
- **Frontend:** Next.js con TypeScript.
- **Base de Datos:** SQLite (puede ser reemplazada según las necesidades).

## Instalación y Configuración

### Backend
1. Clonar el repositorio y moverse a la carpeta `todo-backend`.
2. Crear el archivo `.env` y añadir `JWT_SECRET=mysecretkey`.
3. Instalar dependencias:
   ```bash
   npm install
