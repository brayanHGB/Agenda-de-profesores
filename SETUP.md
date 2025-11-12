# Sistema de Agendamiento de Tutorías

## Configuración e Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el servidor backend y frontend simultáneamente
```bash
npm run dev
```

Esto iniciará:
- **Backend API**: http://localhost:3001
- **Frontend**: http://localhost:3000

### 3. O ejecutar por separado

**Terminal 1 - Backend (API REST)**:
```bash
npm start
```

**Terminal 2 - Frontend (Servidor HTTP)**:
```bash
npm run frontend
```

## Estructura del Proyecto

```
.
├── public/
│   ├── index.html           # Página principal
│   ├── log_in.html          # Página de login
│   ├── booking.html         # Página de agendamiento
│   ├── user_ui.html         # Panel de usuario
│   ├── api/
│   │   └── teachers.json    # Base de datos de profesores
│   ├── css/
│   │   ├── styles.css
│   │   ├── nav-bar.css
│   │   └── lottie.css
│   └── js/
│       └── ...
├── server.js                # Servidor Express
└── package.json
```

## Endpoints de la API

### Obtener todos los profesores
```
GET http://localhost:3001/api/teachers
```

### Buscar profesores por materia
```
GET http://localhost:3001/api/teachers/search?subject=Matemáticas
```

### Obtener profesores de una materia específica
```
GET http://localhost:3001/api/teachers/Matemáticas
```

### Obtener detalles de un profesor
```
GET http://localhost:3001/api/teachers/details/1
```

## Características

✅ **Búsqueda de Profesores**
- Barra de búsqueda en tiempo real
- Filtrado por materia, especialidad y nombre
- Muestra disponibilidad y tarifa

✅ **Información de Profesores**
- Foto de perfil
- Calificación y número de reseñas
- Precio por hora
- Disponibilidad

✅ **Formulario de Agendamiento**
- Selección de profesor
- Fecha y hora
- Duración de la tutoría
- Notas adicionales

✅ **Validaciones**
- Campos obligatorios
- Fecha mínima = hoy
- Modal de confirmación

## Datos de Ejemplo

La base de datos incluye 10 profesores:
1. María García - Matemáticas
2. Carlos López - Inglés
3. Sofía Méndez - Física
4. Juan Rodríguez - Historia
5. Elena Ruiz - Química
6. David Chen - Programación
7. Patricia Gómez - Literatura
8. Roberto Pérez - Biología
9. Isabelle Martin - Francés
10. Marco Moreno - Estadística

## Próximos Pasos

- Integrar base de datos real (MongoDB, PostgreSQL, etc.)
- Agregar sistema de pagos
- Implementar autenticación real
- Agregar calendario de disponibilidad
- Sistema de calificaciones y reviews
- Notificaciones por email

## Google Calendar Integration

La interfaz de booking incluye una sección para sincronizar eventos con Google Calendar.

### Configuración Rápida:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto y habilita Google Calendar API
3. Crea credenciales OAuth 2.0 (ID de cliente)
4. Copia tu **Client ID** y **API Key**
5. Abre `public/booking.html` y reemplaza:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
   const GOOGLE_API_KEY = 'YOUR_API_KEY';
   ```

📖 **Ver archivo completo**: `GOOGLE_CALENDAR_SETUP.md`

### Características:
- ✅ Conectar/desconectar Google Calendar
- ✅ Agregar eventos automáticamente
- ✅ Sincronización en tiempo real
- ✅ Recordatorios automáticos
