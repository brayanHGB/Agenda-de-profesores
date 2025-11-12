# 📚 Agenda de Profesores - Plataforma de Tutorías

Una plataforma moderna de tutorías que conecta estudiantes con profesores. Los usuarios pueden agendar clases, gestionar perfiles y sincronizar horarios disponibles.

---

## 🎯 Características Principales

### Para Estudiantes
- ✅ Registro y perfil completo con foto
- ✅ Búsqueda y filtrado de profesores por materia
- ✅ Sistema de reserva de tutorías
- ✅ Integración con Google Calendar
- ✅ Visualización de horarios disponibles

### Para Profesores
- ✅ Registro y perfil profesional
- ✅ Panel de control para gestionar horarios
- ✅ Visualización de citas/appointments
- ✅ Confirmación y cancelación de citas
- ✅ Sincronización automática con estudiantes

### Características Generales
- ✅ Diseño responsive y moderno
- ✅ Login y registro con validaciones
- ✅ Almacenamiento local de datos (localStorage)
- ✅ Backend con Express.js para API
- ✅ Base de datos JSON
- ✅ Animaciones suaves con AOS

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Node.js** (v14 o superior) - [Descargar](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)

Verifica las versiones:
```bash
node --version
npm --version
```

---

## 🚀 Instalación Rápida

### 1. Clonar el Repositorio
```bash
git clone <URL-del-repositorio>
cd agenda de profesores
```

### 2. Instalar Dependencias del Backend
```bash
npm install
```

Esto instalará:
- `express` - Framework web
- `cors` - Para solicitudes cross-origin

### 3. Verificar la Estructura de Carpetas
```
agenda de profesores/
├── public/
│   ├── index.html
│   ├── log_in.html
│   ├── log_in.js
│   ├── booking.html
│   ├── teacher_dashboard.html
│   ├── teacher_profile.html
│   ├── student_profile.html
│   ├── user_ui.html
│   ├── api/
│   │   ├── teachers.json
│   │   └── teacher_schedules.json
│   ├── css/
│   │   ├── nav-bar.css
│   │   ├── styles.css
│   │   ├── log_in.css
│   │   └── lottie.css
│   └── img/
│       ├── favicon.ico
│       └── intro.json
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Configuración e Instalación de Dependencias

### Backend (Express Server)

Ya debería estar instalado con `npm install`, pero si necesitas reinstalar:

```bash
npm install express cors
```

### Frontend (Sin dependencias externas)

El frontend no requiere instalación de dependencias. Usa archivos CDN para:
- **AOS** (Animate On Scroll) - Animaciones
- **Lottie Web** - Animaciones JSON
- **Google Calendar API** - Integración de calendario

---

## 🎮 Cómo Ejecutar el Proyecto

### Opción 1: Con dos terminales (Recomendado)

**Terminal 1 - Ejecutar el Backend:**
```bash
node server.js
```
Deberías ver:
```
Servidor corriendo en http://localhost:3001
```

**Terminal 2 - Ejecutar el Frontend:**
```bash
npx http-server public -p 8080
```
Deberías ver:
```
Hit CTRL-C to stop the server
http://127.0.0.1:8080
```

### Opción 2: Una sola terminal (Modo background)

**Windows (PowerShell):**
```bash
Start-Process node server.js
Start-Process npx -ArgumentList "http-server public -p 8080"
```

**Mac/Linux:**
```bash
node server.js &
npx http-server public -p 8080 &
```

### 3. Acceder a la Aplicación

Abre tu navegador y ve a:
```
http://localhost:8080
```

---

## 📱 Flujo de Uso

### Para Nuevos Usuarios

1. **Página Principal** (`http://localhost:8080`)
   - Click en "Regístrate" o "Inicia sesión"

2. **Registro** (`log_in.html`)
   - Ingresa nombre, apellido, email
   - Selecciona rol: Profesor o Estudiante
   - Click en "Crear Cuenta"

3. **Completar Perfil**
   - Profesores → `teacher_profile.html`
   - Estudiantes → `student_profile.html`
   - Sube foto, completa información adicional
   - Guarda cambios

### Para Profesores

4. **Panel de Control** (`teacher_dashboard.html`)
   - Gestiona tus horarios disponibles
   - Visualiza tus citas
   - Confirma o cancela citas

5. **Sincronización**
   - Tus horarios se ven automáticamente en la búsqueda de estudiantes

### Para Estudiantes

4. **Buscar Profesores** (`booking.html`)
   - Busca por materia
   - Filtra por disponibilidad
   - Selecciona horario disponible
   - Agenda tu clase

---

## 🔌 API Endpoints

### Estudiantes
- `GET /api/teachers` - Lista todos los profesores
- `GET /api/teachers/search?subject=X` - Busca profesores por materia
- `GET /api/teachers/:subject` - Profesores de una materia específica
- `GET /api/teachers/details/:id` - Detalles de un profesor

### Profesores
- `GET /api/teacher/schedules/:teacherId` - Obtiene horarios y citas
- `POST /api/teacher/schedules/:teacherId` - Agrega horario disponible
- `DELETE /api/teacher/schedules/:teacherId/:hourIndex` - Elimina horario
- `POST /api/teacher/appointments/:teacherId/confirm/:appointmentId` - Confirma cita
- `DELETE /api/teacher/appointments/:teacherId/:appointmentId` - Cancela cita
- `GET /api/teacher/all-schedules` - Obtiene todos los horarios (para sincronizar)

---

## 💾 Estructura de Datos

### teachers.json
```json
{
  "teachers": [
    {
      "id": "1",
      "name": "Carlos Martínez",
      "subject": "Matemáticas",
      "email": "carlos@example.com",
      "experience": "5-10 años",
      "rate": 50000
    }
  ]
}
```

### teacher_schedules.json
```json
{
  "schedules": [
    {
      "teacherId": "1",
      "teacherName": "Carlos Martínez",
      "availableHours": [
        {
          "day": "lunes",
          "startTime": "09:00",
          "endTime": "12:00"
        }
      ],
      "appointments": [
        {
          "id": "apt1",
          "studentName": "Juan Pérez",
          "studentEmail": "juan@example.com",
          "subject": "Matemáticas",
          "date": "2025-11-15",
          "startTime": "09:00",
          "endTime": "10:00"
        }
      ]
    }
  ]
}
```

---

## 🔐 localStorage Keys

El proyecto almacena datos localmente en el navegador:

```javascript
// Para Profesores
localStorage.teacherRegistration    // Datos del registro
localStorage.teacherProfile         // Datos del perfil
localStorage.teacherProfilePhoto    // Foto en base64

// Para Estudiantes
localStorage.studentRegistration    // Datos del registro
localStorage.studentProfile         // Datos del perfil
localStorage.studentProfilePhoto    // Foto en base64

// Horarios de Profesores
localStorage.teacherSchedules       // Sincronización de horarios
```

---

## 🎨 Paleta de Colores

```css
Primary: #0f172a (Negro profundo)
Secondary: #1e293b (Gris oscuro)
Accent: #06b6d4 (Cyan)
Background: #ffffff (Blanco)
Text: #0f172a (Negro)
Muted: #64748b (Gris)
Border: #e2e8f0 (Gris muy claro)
```

---

## 📁 Archivos Principales

### HTML Pages
- `index.html` - Página de inicio
- `log_in.html` - Login y registro
- `booking.html` - Búsqueda y reserva de clases
- `teacher_dashboard.html` - Panel de control de profesores
- `teacher_profile.html` - Perfil de profesores
- `student_profile.html` - Perfil de estudiantes
- `user_ui.html` - Dashboard de usuarios

### Estilos CSS
- `css/nav-bar.css` - Estilos de navegación
- `css/styles.css` - Estilos generales
- `css/log_in.css` - Estilos de login
- `css/lottie.css` - Estilos de animaciones

### Backend
- `server.js` - Servidor Express con API
- `package.json` - Dependencias de Node.js

### Datos
- `public/api/teachers.json` - Perfil de profesores
- `public/api/teacher_schedules.json` - Horarios y citas

---

## 🔧 Desarrollo y Mejoras Futuras

### Para agregar nuevas funcionalidades:

1. **Backend** - Modifica `server.js` y agrega nuevos endpoints
2. **Frontend** - Crea nuevas páginas HTML en `public/`
3. **Estilos** - Agrega estilos en `public/css/`
4. **Datos** - Actualiza los archivos JSON en `public/api/`

### Próximas Mejoras Sugeridas

- [ ] Autenticación real con JWT
- [ ] Base de datos (MongoDB, PostgreSQL)
- [ ] Sistema de pagos (Stripe, PayU)
- [ ] Notificaciones por email
- [ ] Chat en tiempo real (WebSockets)
- [ ] Sistema de ratings
- [ ] Reportes y estadísticas
- [ ] App móvil (React Native)

---

## 🐛 Troubleshooting

### "Puerto 3001 ya está en uso"
```bash
# Cambiar puerto en server.js línea 1
const PORT = 3002; // Cambiar a otro puerto
```

### "No se cargan los estilos CSS"
- Asegúrate de que el servidor frontend está corriendo en `http://localhost:8080`
- Verifica que `public/css/` existe y tiene los archivos

### "localStorage no guarda datos"
- Algunos navegadores tienen restrictions con localStorage
- Intenta en modo incógnito
- Verifica que el navegador permite localStorage

### "Google Calendar no funciona"
- Necesitas agregar tu propio Client ID
- Ve a [Google Cloud Console](https://console.cloud.google.com/)
- Crea un proyecto y obtén credenciales OAuth

---

## 📚 Documentación Adicional

Consulta estos archivos para más información:

- `QUICK_START.md` - Guía rápida de inicio
- `TEACHER_PANEL_GUIDE.md` - Guía del panel de profesores
- `SYNC_ARCHITECTURE.md` - Arquitectura de sincronización

---

## 👥 Contribuidores

Para colaborar en el proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Contacto y Soporte

Si tienes preguntas o problemas:

1. Revisa la sección de Troubleshooting arriba
2. Consulta los archivos de documentación
3. Abre un issue en el repositorio

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 🎉 ¡Empezar a Desarrollar!

```bash
# 1. Clonar
git clone <URL>

# 2. Instalar
npm install

# 3. Backend
node server.js

# 4. Frontend (otra terminal)
npx http-server public -p 8080

# 5. Abrir navegador
http://localhost:8080
```

**¡Listo! Ahora puedes comenzar a trabajar en el proyecto.** 🚀

---

**Última actualización:** Noviembre 12, 2025
**Versión:** 1.0.0
