# 📊 Flujo de Funcionamiento - Google Calendar Integration

## Diagrama de Flujo General

```
┌─────────────────────────────────────────────────────────────┐
│         INTERFAZ DE AGENDAMIENTO DE TUTORÍAS                │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────┐
         │  Usuario ve sección de          │
         │  Google Calendar                │
         └─────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
        Conectado                  No conectado
                │                     │
                │                     ▼
                │            ┌──────────────────┐
                │            │ Hace clic en     │
                │            │ "Conectar"       │
                │            └──────────────────┘
                │                     │
                │                     ▼
                │            ┌──────────────────────────┐
                │            │ Popup de Google         │
                │            │ (Iniciar sesión)       │
                │            └──────────────────────────┘
                │                     │
                │                     ▼
                │            ┌──────────────────────────┐
                │            │ Autorizar acceso a      │
                │            │ calendario             │
                │            └──────────────────────────┘
                │                     │
                │                     ▼
                │            ┌──────────────────────────┐
                │            │ Estado: "Conectado ✓"  │
                │            └──────────────────────────┘
                │                     │
                └──────────┬──────────┘
                           │
                           ▼
         ┌─────────────────────────────────┐
         │  Usar formulario para           │
         │  agendar tutoría                │
         └─────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────┐
         │  Seleccionar:                   │
         │  - Profesor                     │
         │  - Fecha                        │
         │  - Hora                         │
         │  - Duración                     │
         │  - Notas                        │
         └─────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────┐
         │  Hacer clic en               │
         │  "Agendar Tutoría"              │
         └─────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
        Google Calendar           Local Database
        Conectado                 Desconectado
                │                     │
                ▼                     ▼
         ┌────────────────┐     ┌────────────────┐
         │ Crear evento   │     │ Guardar en DB  │
         │ en Calendar    │     │ (sin calendario)│
         └────────────────┘     └────────────────┘
                │                     │
                ▼                     ▼
         ┌────────────────────────────────┐
         │  Mostrar modal de éxito        │
         │  "¡Tutoría Agendada!"          │
         └────────────────────────────────┘
```

## Flujo de Datos

### Cuando Conecta Google Calendar:

```
Usuario
  │
  └─► handleGoogleCalendarAuth()
       │
       └─► gapi.auth2.getAuthInstance()
            │
            ├─► Abre popup de Google
            │
            └─► Retorna ID Token
                 │
                 └─► googleAuthToken (guardado)
                      │
                      └─► updateCalendarStatus(true)
                           │
                           └─► Botón cambia a "Desconectar"
                           └─► Mostrar "✓ Conectado"
```

### Cuando Agenda una Tutoría (con Google Calendar):

```
Formulario Submit
  │
  ├─► Validar campos
  │
  ├─► Preparar eventDetails:
  │    ├─ teacherName
  │    ├─ subject
  │    ├─ notes
  │    ├─ startTime (ISO format)
  │    └─ endTime (ISO format)
  │
  ├─► addEventToGoogleCalendar(eventDetails)
  │    │
  │    ├─► Crear objeto event
  │    │    ├─ summary
  │    │    ├─ description
  │    │    ├─ start/end times
  │    │    ├─ reminders
  │    │    └─ timeZone
  │    │
  │    └─► gapi.client.calendar.events.insert()
  │         │
  │         └─► Retorno: éxito/error
  │
  ├─► Mostrar modal de éxito
  │
  └─► Limpiar formulario
```

## Estructura de Datos del Evento

```javascript
{
  "summary": "Tutoría con María García",
  "description": "Materia: Matemáticas\nNota: Necesito ayuda con cálculo",
  "start": {
    "dateTime": "2025-11-20T09:00:00",
    "timeZone": "America/Bogota"
  },
  "end": {
    "dateTime": "2025-11-20T10:00:00",
    "timeZone": "America/Bogota"
  },
  "location": "Virtual",
  "reminders": {
    "useDefault": false,
    "overrides": [
      { "method": "email", "minutes": 1440 },      // 24 horas
      { "method": "popup", "minutes": 30 }         // 30 minutos
    ]
  }
}
```

## Cambios de Estado Visual

### Estados del Botón:

```
ESTADO 1: Desconectado (inicial)
┌──────────────────────────────────┐
│ 🔵 Conectar con Google Calendar   │
└──────────────────────────────────┘
Clase: google-calendar-btn (sin "connected")

ESTADO 2: Conectado
┌──────────────────────────────────┐
│ ✓ Desconectar Google Calendar    │
│ (Fondo azul claro)               │
└──────────────────────────────────┘
Clase: google-calendar-btn.connected

ESTADO 3: Estado visible
┌──────────────────────────────────┐
│ ⚫ ✓ Conectado a Google Calendar   │
│ (Verde, solo visible cuando connected)
└──────────────────────────────────┘
Clase: calendar-status.show
```

## Manejo de Errores

```
Error al iniciar API
  │
  ├─► console.error()
  └─► Botón disabled (deshabilitado)

Error al autenticar
  │
  ├─► alert("Error al conectar con Google Calendar")
  └─► Estado permanece desconectado

Error al crear evento
  │
  ├─► console.error()
  ├─► Retorna false
  └─► Tutoría se guarda igual (sin calendar)
```

## Flujo de Seguridad OAuth

```
Tu Aplicación                 Google
       │                         │
       ├─ Abre popup ──────────────────►
       │                         │
       │◄────── Pide credenciales ────┤
       │                         │
       ├─ Usuario ingresa login ────────►
       │                         │
       │◄───── Pide autorización ──────┤
       │                         │
       ├─ Usuario autoriza ────────────►
       │                         │
       │◄──── ID Token/Access Token ───┤
       │                         │
       ├─ Guarda token (googleAuthToken)
       │
       └─ Usa token para crear eventos
```

## Integración con API de Profesores

```
Profesores API (localhost:3001)
  │
  ├─► GET /api/teachers
  │    └─► Carga lista de profesores
  │         │
  │         └─► Mostrar en formulario
  │              │
  │              └─► Selecciona profesor
  │                   │
  │                   └─► Obtiene nombre para evento Google
  │
  └─► Nombre profesor usado en:
       ├─ event.summary = "Tutoría con {nombre}"
       └─ email confirmación
```

## Ejemplo Completo de Uso

```
1. Usuario abre http://localhost:8080/booking.html
2. Ve sección "Sincronizar con Google Calendar"
3. Hace clic en "Conectar con Google Calendar"
4. Se abre popup de Google
5. Inicia sesión con su cuenta Google
6. Autoriza acceso al calendario
7. Botón cambia a "Desconectar" y aparece "✓ Conectado"
8. Usuario llena el formulario:
   - Selecciona profesor "María García"
   - Selecciona fecha "2025-11-20"
   - Selecciona hora "09:00"
   - Selecciona duración "60" minutos
   - Agrega nota "Necesito ayuda con cálculo"
9. Hace clic en "Agendar Tutoría"
10. Sistema crea evento en Google Calendar:
    - Título: "Tutoría con María García"
    - Fecha: 2025-11-20
    - Hora: 09:00 - 10:00
    - Descripción: "Materia: Matemáticas\nNota: Necesito ayuda con cálculo"
    - Recordatorios: email 24h antes, popup 30 min antes
11. Muestra modal de éxito
12. Evento visible en Google Calendar del usuario
13. Usuario recibe recordatorios automáticos
```
