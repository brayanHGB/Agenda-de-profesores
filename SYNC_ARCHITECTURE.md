# 🔄 Sincronización Profesor-Estudiante

## ¿Cómo Funciona?

### 1. El Profesor Establece Horarios

**Panel del Profesor (teacher_dashboard.html)**
```
✅ Lunes: 09:00 - 12:00
✅ Martes: 09:00 - 12:00
✅ Miércoles: 14:00 - 18:00
✅ Jueves: 09:00 - 12:00
✅ Viernes: 15:00 - 19:00
```

**Base de Datos (teacher_schedules.json)**
```json
{
  "teacherId": "1",
  "teacherName": "Carlos Martínez",
  "availableHours": [
    { "day": "lunes", "startTime": "09:00", "endTime": "12:00" },
    { "day": "martes", "startTime": "09:00", "endTime": "12:00" },
    { "day": "miércoles", "startTime": "14:00", "endTime": "18:00" },
    { "day": "jueves", "startTime": "09:00", "endTime": "12:00" },
    { "day": "viernes", "startTime": "15:00", "endTime": "19:00" }
  ]
}
```

### 2. El Estudiante Ve los Horarios

**Booking Interface (booking.html)**
```
📱 Juan selecciona a "Carlos Martínez" → Profesor Matemáticas
📅 Sistema obtiene automáticamente sus horarios disponibles
⏰ Ve: Lunes, Martes, Miércoles, Jueves, Viernes (con horas específicas)
✅ Solo puede reservar en esos slots
```

### 3. Flujo de Cita

```
PROFESOR                           ESTUDIANTE
   ↓                                  ↓
[Panel del Profesor]          [Interfaz de Booking]
   ↓                                  ↓
Agrega horarios              Ve profesor disponible
   ↓                                  ↓
Horarios guardados           Reserva en slot disponible
en teacher_schedules.json         ↓
   ↓                          Cita agregada a
Cita aparece en              appointments[] del profesor
"Mis Citas"                        ↓
   ↓                          Profesor recibe notificación
Profesor confirma/            (en su panel)
cancela                            ↓
   ↓                          Estudiante recibe
Cita sincronizada            confirmación por email
```

---

## Estructura de Datos

### Teacher Schedules (Maestro)
```
public/api/teacher_schedules.json
├── schedules[]
│   ├── teacherId: "1"
│   ├── teacherName: "Carlos Martínez"
│   ├── availableHours[]
│   │   └── { day, startTime, endTime }
│   └── appointments[]
│       └── { id, studentName, date, startTime, endTime, notes }
```

### Teachers (Estudiantes)
```
public/api/teachers.json
└── teachers[]
    └── { id, name, image, subject, specialty, rating, reviews, price }
```

---

## Endpoints Clave

### Para Profesores
```
GET  /api/teacher/schedules/:teacherId    → Obtiene sus horarios y citas
POST /api/teacher/schedules/:teacherId    → Agrega nuevo horario
DEL  /api/teacher/schedules/:teacherId/:hourIndex → Elimina horario
POST /api/teacher/appointments/:teacherId/confirm/:aptId → Confirma cita
DEL  /api/teacher/appointments/:teacherId/:aptId → Cancela cita
```

### Para Estudiantes
```
GET  /api/teacher/all-schedules            → Obtiene TODOS los horarios (para booking)
GET  /api/teachers                         → Obtiene lista de profesores
GET  /api/teachers/search?subject=X        → Busca profesores por materia
```

---

## Ejemplo en Tiempo Real

### Paso 1: Profesor Agrega Horario
```javascript
// POST /api/teacher/schedules/1
{
  "day": "lunes",
  "startTime": "09:00",
  "endTime": "12:00"
}
```

**Resultado en teacher_schedules.json:**
```json
{
  "teacherId": "1",
  "availableHours": [
    { "day": "lunes", "startTime": "09:00", "endTime": "12:00" }
  ]
}
```

### Paso 2: Estudiante Ve el Horario
```javascript
// GET /api/teacher/all-schedules
// Devuelve todos los horarios de todos los profesores
// El booking.html filtra y muestra solo los relevantes

const schedules = await fetch('/api/teacher/all-schedules').then(r => r.json());
// schedules[0].availableHours contiene el horario que el profesor acaba de agregar
```

### Paso 3: Estudiante Reserva
```javascript
// El estudiante selecciona:
// - Profesor: "Carlos Martínez" (ID: 1)
// - Día: Lunes
// - Hora: 09:00 - 10:00 (dentro del horario disponible)

// La cita se agrega a appointments[]
POST /api/bookings
{
  "teacherId": "1",
  "studentName": "Juan Pérez",
  "date": "2025-11-18", // Próximo lunes
  "startTime": "09:00",
  "endTime": "10:00"
}
```

### Paso 4: Profesor Ve la Cita
```javascript
// GET /api/teacher/schedules/1
// En la respuesta:
{
  "appointments": [
    {
      "id": "apt1",
      "studentName": "Juan Pérez",
      "date": "2025-11-18",
      "startTime": "09:00",
      "endTime": "10:00"
    }
  ]
}
```

---

## Ventajas de Esta Arquitectura

✅ **Single Source of Truth** - Los horarios están en un solo lugar
✅ **Sincronización Automática** - No necesita actualización manual
✅ **Escalable** - Soporta múltiples profesores y estudiantes
✅ **Tiempo Real** - Cambios inmediatos para ambos usuarios
✅ **Flexible** - Fácil de extender con notificaciones, pagos, etc.

---

## Consideraciones de Seguridad

🔒 **Autenticación** - Verificar que solo el profesor autorizado pueda modificar sus horarios
🔒 **Validación** - Asegurar que horarios no se sobrepongan
🔒 **Integridad** - Evitar que estudiantes accedan a editar horarios
🔒 **Rate Limiting** - Limitar requests para evitar abuso

---

## Próximos Pasos

1. **Agregar validación** en frontend para evitar solapamiento de horarios
2. **Implementar autenticación** para diferenciar profesores
3. **Agregar notificaciones** cuando se confirme/cancele una cita
4. **Integrar Google Calendar** para sincronizar automáticamente
5. **Crear panel de analytics** para profesores (ingresos, horas trabajadas, etc.)

