# Frontend - Seguimiento de Gastos Personales

Este proyecto es la interfaz de usuario del sistema de seguimiento de gastos personales, desarrollado como una prueba técnica para **Informa Colombia S.A.S**. La aplicación permite a los usuarios agregar, ver y gestionar gastos personales mediante una interfaz intuitiva y conectada a la API.

Repositorio: [https://github.com/pablomadariaga/informacolombia.git](https://github.com/pablomadariaga/informacolombia.git)

---

## Instrucciones de Configuración

A continuación se presentan los pasos para configurar y ejecutar el frontend en un entorno local.

---

### 1. Clonar el Repositorio

Clona el repositorio e ingresa en la carpeta `frontend`:

```bash
git clone https://github.com/pablomadariaga/informacolombia.git
cd informacolombia/frontend
```

### 2. Instalar Dependencias

Asegúrate de estar en la carpeta `frontend` y ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install
# o
yarn install
```

---

### 3. Configurar el Archivo `.env.local`

Crea un archivo `.env.local` en la carpeta `frontend` y configura la URL de la API. Puedes copiarlo de un archivo `.env.example` si está disponible.

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3333/api
```

Esta variable `NEXT_PUBLIC_API_URL` debe apuntar al servidor de la API en ejecución (por defecto en `http://localhost:3333`).

---

### 4. Ejecutar el Proyecto

Para iniciar el proyecto en modo de desarrollo, usa el siguiente comando:

```bash
npm run dev
# o
yarn dev
```

El proyecto estará disponible en `http://localhost:3000`.

---

## Características de la Aplicación

La aplicación permite:
- Ver la lista de gastos y sus detalles.
- Agregar, editar y eliminar gastos.
- Visualizar mensajes de éxito o error mediante toasts personalizados.

---

## Notas Técnicas

- **Lenguaje**: TypeScript
- **Framework**: Next.js
- **Principios de Desarrollo**: Este proyecto sigue principios de componentes modulares y utiliza hooks y contextos personalizados para la gestión de estado (como `ToastContext` y `LoadingContext`).
- **Comentarios**: El código contiene comentarios en inglés para asegurar la compatibilidad internacional.

---

## Estructura del Código

```
/frontend
├──/app
├──├──/components       # Componentes de la aplicación
├──├──/context          # Contextos para Toast y Loading
├──├──/{page/expense}            # Rutas y páginas de Next.js
├──├──/services         # Servicios para llamadas a la API
├──├──/types            # Interfaces TypeScript
└──├──README.md
```

---

## Contribución

Si deseas contribuir a este proyecto, sigue las convenciones de Git con mensajes de commit claros y descriptivos que reflejen las funcionalidades o correcciones realizadas. Para cada funcionalidad importante o ajuste, realiza un commit independiente.

Para más detalles, consulta el [repositorio en GitHub](https://github.com/pablomadariaga/informacolombia.git).

---

Este archivo `README.md` contiene toda la información necesaria para que cualquier desarrollador pueda configurar y ejecutar el frontend en su entorno local.
