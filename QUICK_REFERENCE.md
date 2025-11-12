# ⚡ Quick Reference - Google Calendar Integration

## 🟢 Iniciar Rápido (3 pasos)

### 1. Obtén Credenciales
```
https://console.cloud.google.com/
→ Nuevo Proyecto
→ Buscar "Google Calendar API"
→ Habilitar
→ Crear OAuth 2.0 (tipo: Aplicación web)
→ Copiar Client ID y API Key
```

### 2. Configura
Edita `public/booking.html` línea ~500:
```javascript
const GOOGLE_CLIENT_ID = 'TU_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'TU_API_KEY';
```

### 3. Prueba
```
http://localhost:8080/booking.html
→ Scroll a "Google Calendar"
→ Click "Conectar"
→ Agenda una tutoría
→ Verifica en Google Calendar
```

## 📝 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `public/booking.html` | Interfaz + Google Calendar |
| `GOOGLE_CALENDAR_SETUP.md` | Guía detallada |
| `GOOGLE_CALENDAR_CHECKLIST.md` | Paso a paso |
| `GOOGLE_CALENDAR_EXAMPLES.md` | Personalización |

## 🎯 Lo que Hace

```javascript
// Cuando conectas Google Calendar
handleGoogleCalendarAuth()
→ Abre popup de Google
→ Pide autorización
→ Guarda token

// Cuando agendas una tutoría
addEventToGoogleCalendar()
→ Crea evento con datos
→ Incluye profesor, materia, notas
→ Agrega recordatorios
→ Lo pone en tu Google Calendar
```

## 🔑 Variables Importantes

```javascript
const API_URL = 'http://localhost:3001/api';
const GOOGLE_CLIENT_ID = 'YOUR_ID.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'YOUR_KEY';
const TIMEZONE = 'America/Bogota';

// Estado
let googleAuthToken = null;           // Token de Google
let googleCalendarConnected = false;  // Conectado o no
let allTeachers = [];                 // Lista de profesores
```

## 🚨 Errores Comunes

```javascript
// ❌ CORS Error
Causa: Credenciales incorrectas o localhost no autorizado
Solución: Verifica Google Cloud → agregar localhost

// ❌ Cliente ID inválido
Causa: Copié incompleto o con espacios
Solución: Copia todo: "abc123.apps.googleusercontent.com"

// ❌ Popup bloqueado
Causa: Navegador bloquea popups
Solución: Permite popups para localhost

// ❌ Evento no aparece
Causa: Token expiró o timezone mal
Solución: Reconecta o verifica timezone
```

## 🎨 Componentes HTML

```html
<!-- Botón Conectar -->
<button id="googleCalendarBtn" class="google-calendar-btn">
  <span class="google-icon"></span>
  <span id="btnText">Conectar con Google Calendar</span>
</button>

<!-- Indicador Conectado -->
<div class="calendar-status" id="calendarStatus">
  <span class="calendar-status-dot"></span>
  <span id="statusText">Conectado a Google Calendar</span>
</div>

<!-- Instrucciones -->
<div class="calendar-instructions">
  ¿Cómo funciona?
  1. Haz clic para autorizar
  2. Inicia sesión
  3. Autoriza acceso
  4. ¡Listo!
</div>
```

## 🔧 Funciones Principales

```javascript
// Inicializar
initGoogleCalendar()

// Conectar/Desconectar
handleGoogleCalendarAuth()

// Cambiar estado visual
updateCalendarStatus(true/false)

// Crear evento
await addEventToGoogleCalendar({
  teacherName: 'María García',
  subject: 'Matemáticas',
  notes: 'Cálculo integral',
  startTime: '2025-11-20T09:00:00',
  endTime: '2025-11-20T10:00:00'
})
```

## 📊 Estado Visual

```
Desconectado:
┌─────────────────────────────┐
│ 🔵 Conectar con Google Calendar
└─────────────────────────────┘

Conectado:
┌─────────────────────────────┐
│ ✓ Desconectar Google Calendar
│ (Fondo azul claro)
│ 
│ ⚫ ✓ Conectado a Google Calendar
└─────────────────────────────┘
```

## 🧪 Testing

```javascript
// Test sin credenciales
const MOCK_MODE = true;  // Simula eventos

// Test con credenciales reales
const MOCK_MODE = false; // Conecta a Google
```

## 📲 Evento Creado

```json
{
  "summary": "Tutoría con María García",
  "description": "Materia: Matemáticas\nNota: Cálculo integral",
  "start": { "dateTime": "2025-11-20T09:00:00", "timeZone": "America/Bogota" },
  "end": { "dateTime": "2025-11-20T10:00:00", "timeZone": "America/Bogota" },
  "location": "Virtual",
  "reminders": {
    "overrides": [
      { "method": "email", "minutes": 1440 },
      { "method": "popup", "minutes": 30 }
    ]
  }
}
```

## 🔍 Debug Console

```javascript
// Ver en console del navegador (F12)

// Estado
console.log('Conectado:', googleCalendarConnected);
console.log('Token:', googleAuthToken);

// Testing
console.log('Auth Instance:', gapi.auth2.getAuthInstance());
console.log('All Teachers:', allTeachers);

// Cronometro
console.time('Google Event Creation');
await addEventToGoogleCalendar(details);
console.timeEnd('Google Event Creation');
```

## ⚙️ Configuración por Ubicación

```javascript
// Cambiar TIMEZONE según ubicación:

// Colombia
'America/Bogota'

// México
'America/Mexico_City'

// USA
'America/New_York'
'America/Los_Angeles'

// Argentina
'America/Argentina/Buenos_Aires'

// España
'Europe/Madrid'

// Japón
'Asia/Tokyo'
```

## 🔐 Seguridad Checklist

- [ ] No commits credenciales en Git
- [ ] Usa `.gitignore` para archivos sensibles
- [ ] En producción, usa variables de entorno
- [ ] Restringe API Key en Google Cloud
- [ ] Implementa HTTPS
- [ ] Limpia tokens al desloguear

```javascript
// .gitignore
google-calendar-config.js
.env
.env.local
*.key
*.pem
```

## 📞 Contactos

- **Google Calendar API**: https://developers.google.com/calendar
- **OAuth 2.0**: https://developers.google.com/identity
- **Stack Overflow**: #google-calendar-api
- **Google Community**: developers.google.com/community

## 🎯 Checklist Rápido

- [ ] Client ID obtenido
- [ ] API Key obtenida
- [ ] booking.html actualizado
- [ ] Localhost agregado en Google Cloud
- [ ] Página carga sin errores
- [ ] Botón "Conectar" visible
- [ ] Popup abre al hacer click
- [ ] Se puede autorizar
- [ ] Estado cambia a "Conectado"
- [ ] Evento se crea en Google Calendar

## 🚀 Deploy Steps

```bash
# 1. Asegurar credenciales en .env
GOOGLE_CLIENT_ID=...
GOOGLE_API_KEY=...

# 2. Actualizar URLs en código
const API_URL = process.env.API_URL

# 3. Habilitar HTTPS
# 4. Restringir API Key
# 5. Probar en staging
# 6. Deploy a producción
```

## 📈 Metrics para Monitorear

```javascript
// Agregar tracking:
- Usuarios conectados a Google Calendar
- Eventos creados exitosamente
- Errores de sincronización
- Desconexiones
- Tiempo de creación de evento

console.log('Evento creado exitosamente', {
  teacher: eventDetails.teacherName,
  timestamp: new Date(),
  googleEventId: response.result.id
});
```

## 🎓 Links Útiles

- [Google Calendar API Docs](https://developers.google.com/calendar/api)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In Library](https://developers.google.com/identity/libraries/gsi)
- [Event Creation Guide](https://developers.google.com/calendar/api/guides/create-events)

---

**Imprimir esta página para referencia rápida** 🖨️

Última actualización: 2025-11-12
