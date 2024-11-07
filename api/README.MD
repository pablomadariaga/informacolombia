
# API - Seguimiento de Gastos Personales


Este proyecto es una prueba técnica desarrollada para **Informa Colombia S.A.S**. La API permite gestionar gastos personales a través de operaciones CRUD (Crear, Leer, Actualizar y Eliminar), proporcionando una estructura organizada y escalable.

Repositorio: [https://github.com/pablomadariaga/informacolombia.git](https://github.com/pablomadariaga/informacolombia.git)

---

## Instrucciones de Configuración

A continuación se presentan los pasos para configurar y ejecutar la API en un entorno local.

---
### 1. Clonar el Repositorio

Clona el repositorio e ingresa en la carpeta `api`:

```bash
git clone https://github.com/pablomadariaga/informacolombia.git
cd informacolombia/api
```



### 2. Instalar Dependencias



Asegúrate de estar en la carpeta `api` y ejecuta el siguiente comando para instalar todas las dependencias del proyecto:



```bash
npm install
```

  ---

### 3. Configurar el Archivo `.env`

Crea un archivo `.env`  en la carpeta `api`  puedes copiarlos de `.env.example` y configura los detalles de la conexión a la base de datos MySQL. Usa los siguientes parámetros de ejemplo:


```dotenv
TZ=America/Bogota
PORT=3333
HOST=localhost
LOG_LEVEL=info
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=expenses

```

---
### 4. Ejecutar Migraciones y Seeds

Para configurar la base de datos, ejecuta las migraciones y los seeds, los cuales incluyen categorías predefinidas de gastos.

```bash
node  ace  migration:run
node  ace  db:seed
```
---
### 5. Iniciar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo y ejecutar la API localmente, usa el siguiente comando:

```bash
node  ace  serve  --watch
```

El servidor estará disponible en `http://localhost:3333`.

---
## Endpoints de la API

A continuación se detallan los principales endpoints de la API para la gestión de gastos:

-  `GET /api/expenses` - Obtiene la lista de todos los gastos.

-  `POST /api/expenses` - Crea un nuevo gasto. Requiere los campos `amount`, `category`, `date` y `description` (opcional).

-  `PUT /api/expenses/:id` - Actualiza un gasto existente.

-  `DELETE /api/expenses/:id` - Elimina un gasto específico.

  ---

## Autenticación



Esta API utiliza **access_tokens** para la autenticación de los usuarios. Asegúrate de que los clientes de la API incluyan un token válido en las solicitudes que requieren autenticación.


---
## Notas Técnicas


-  **Lenguaje**: TypeScript

-  **Framework**: AdonisJs

-  **Principios de Desarrollo**: Este proyecto sigue principios SOLID y organiza la lógica de negocio en servicios separados para mejorar la escalabilidad y mantenibilidad.

-  **Comentarios**: El código y las migraciones contienen comentarios en inglés para asegurar la compatibilidad internacional.


---
## Estructura del Código



-  **Controladores**: Manejan las solicitudes HTTP y delegan la lógica al servicio correspondiente.

-  **Servicios**: Contienen la lógica de negocio principal, aplicando principios de responsabilidad única y separación de responsabilidades.

-  **Modelos**: Representan las entidades del sistema y la estructura de las tablas de la base de datos.



---
## Contribución
Si deseas contribuir a este proyecto, sigue las convenciones de Git con mensajes de commit claros y descriptivos que reflejen las funcionalidades o correcciones realizadas. Para cada funcionalidad importante o ajuste, realiza un commit independiente.

Para más detalles, consulta el [repositorio en GitHub](https://github.com/pablomadariaga/informacolombia.git).


Este archivo `api/README.md` contiene toda la información necesaria para que cualquier desarrollador pueda configurar y ejecutar la API en su entorno local.
