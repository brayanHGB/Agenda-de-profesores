# 🎓 Agenda de Profesores - Sistema Completo

## 📋 Descripción del Proyecto

Sistema integral de agendamiento de tutorías que conecta **profesores** y **estudiantes** con sincronización en tiempo real de horarios disponibles.

---

## 🎯 Características Principales

### Para Estudiantes
✅ **Interfaz de Booking** (`booking.html`)
- Buscar y filtrar profesores por materia
- Ver horarios disponibles en tiempo real
- Reservar tutorías
- Integración con Google Calendar
- Modal de confirmación

### Para Profesores
✅ **Panel de Control** (`teacher_dashboard.html`)
- Administrar horarios semanales
- Ver citas programadas
- Confirmar/Cancelar citas
- Estadísticas de desempeño

### Backend
✅ **API REST** (`server.js`)
- Express.js en puerto 3001
- CORS habilitado
- Endpoints para profesores y estudiantes
- Base de datos JSON (escalable)

---

## 📂 Estructura de Archivos

```
📁 agenda de profesores/
├── 📁 public/
│   ├── 📁 api/
│   │   ├── teachers.json           # Base de datos de profesores
│   │   └── teacher_schedules.json  # Horarios y citas
│   ├── 📁 css/
│   │   ├── nav-bar.css
│   │   ├── styles.css
│   │   ├── log_in.css
│   │   └── lottie.css
│   ├── 📁 img/
│   │   ├── favicon.ico
│   │   └── intro.json
│   ├── 📄 index.html               # Página principal
│   ├── 📄 log_in.html              # Login y registro
│   ├── 📄 booking.html             # Interfaz de estudiante
│   ├── 📄 teacher_dashboard.html   # Panel del profesor
│   ├── 📄 user_ui.html             # Dashboard usuario
│   ├── 📄 scripts.js
│   └── 📄 log_in.js
├── 📄 server.js                    # Backend Express
├── 📄 package.json
├── 📄 README.md
├── 📄 TEACHER_PANEL_GUIDE.md       # Guía del panel
└── 📄 SYNC_ARCHITECTURE.md         # Arquitectura de sincronización
```

---

## 🚀 Instalación y Ejecución

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar Backend (Puerto 3001)
```bash
node server.js
```

### 3. Iniciar Frontend (Puerto 8080)
```bash
npx http-server public -p 8080
```

### 4. Acceder a la Aplicación
- **Estudiante**: http://localhost:8080/booking.html
- **Profesor**: http://localhost:8080/teacher_dashboard.html
- **Principal**: http://localhost:8080/index.html

---

## 📚 Guías Disponibles

### 1. [TEACHER_PANEL_GUIDE.md](./TEACHER_PANEL_GUIDE.md)
Documentación completa del panel de profesores:
- Cómo agregar horarios
- Cómo administrar citas
- API endpoints
- Flujo de trabajo

### 2. [SYNC_ARCHITECTURE.md](./SYNC_ARCHITECTURE.md)
Explicación de la sincronización:
- Cómo se sincronizan datos
- Flujo de citas
- Estructura de datos
- Ejemplos en tiempo real

---

## 🔌 API Endpoints

### Profesores

```
GET    /api/teacher/schedules/:teacherId
POST   /api/teacher/schedules/:teacherId
DELETE /api/teacher/schedules/:teacherId/:hourIndex
POST   /api/teacher/appointments/:teacherId/confirm/:appointmentId
DELETE /api/teacher/appointments/:teacherId/:appointmentId
```

### Estudiantes

```
GET    /api/teachers
GET    /api/teachers/search?subject=X
GET    /api/teachers/:subject
GET    /api/teachers/details/:id
GET    /api/teacher/all-schedules
```

---

## 📊 Base de Datos

### teachers.json
Lista de profesores disponibles con:
- Nombre, especialidad, materia
- Foto, calificación, reviews
- Precio por hora

### teacher_schedules.json
Horarios y citas de profesores:
- Horarios disponibles por día/semana
- Citas programadas con detalles del estudiante
- Estado de cada cita

---

## 🔄 Flujo de Sincronización

```
PROFESOR ESTABLECE HORARIO
         ↓
Agrega en teacher_dashboard.html
         ↓
POST /api/teacher/schedules/1
         ↓
Guardar en teacher_schedules.json
         ↓
         ↓
ESTUDIANTE VE HORARIO
         ↓
Abre booking.html
         ↓
GET /api/teacher/all-schedules
         ↓
Muestra profesores con horas disponibles
         ↓
ESTUDIANTE RESERVA
         ↓
POST /api/bookings
         ↓
Cita agregada a appointments[]
         ↓
PROFESOR CONFIRMA
         ↓
GET /api/teacher/schedules/1
         ↓
Ve cita pendiente
         ↓
POST /api/teacher/appointments/1/confirm/apt1
         ↓
Cita confirmada
```

---

## 🎨 Paleta de Colores

- **Primario**: Cyan `#06b6d4`
- **Oscuro**: Slate `#0f172a`, `#1e293b`
- **Claro**: Gris claro `#f8fafc`
- **Bordes**: `#e2e8f0`

---

## 🔐 Características de Seguridad

✅ CORS habilitado
✅ Validación de datos
✅ Manejo de errores
✅ Rutas protegidas (a implementar)
✅ Rate limiting (a implementar)

---

## 🌟 Próximas Características

🔄 **Sincronización en tiempo real con WebSockets**
📧 **Sistema de notificaciones por email**
💳 **Procesamiento de pagos**
📱 **Aplicación móvil nativa**
🤖 **Recomendación automática de profesores**
📊 **Dashboard de analytics avanzado**
🔐 **Autenticación con redes sociales**
🌍 **Soporte multiidioma**

---

## 👥 Usuarios de Prueba

### Profesor
- ID: 1
- Nombre: Carlos Martínez
- URL: http://localhost:8080/teacher_dashboard.html

### Estudiante
- Accede a: http://localhost:8080/booking.html
- Busca cualquier profesor
- Reserva una tutoría

---

## 📞 Soporte

Email: info@holaplat.com
Teléfono: +57 300 123 4567

---

## 📄 Licencia

© 2025 Hola™. Todos los derechos reservados.

---

## 🔗 Enlaces Útiles

- [Panel del Profesor](http://localhost:8080/teacher_dashboard.html)
- [Booking de Estudiante](http://localhost:8080/booking.html)
- [Página Principal](http://localhost:8080/index.html)
- [Login](http://localhost:8080/log_in.html)

---

**Última actualización**: Noviembre 12, 2025
**Versión**: 1.0.0
