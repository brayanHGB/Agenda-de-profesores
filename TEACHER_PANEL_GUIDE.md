# 📚 Panel del Profesor - Guía de Uso

## Descripción General

El panel del profesor es una interfaz completa que permite a los docentes:

✅ **Administrar horas disponibles** - Agregar y eliminar slots de tiempo para tutorías
✅ **Ver citas programadas** - Visualizar todas las tutorías agendadas
✅ **Confirmar/Cancelar citas** - Gestionar la disponibilidad de cada sesión
✅ **Sincronización en tiempo real** - Los horarios se reflejan automáticamente en el booking del estudiante

---

## Características

### 1. **Panel de Información del Profesor**
- Nombre y especialidad del profesor
- Estadísticas: Total de citas y horas disponibles
- Avatar personalizado

### 2. **Administrar Horarios**
**Agregar Nuevo Horario:**
1. Selecciona el día de la semana (lunes a domingo)
2. Establece hora de inicio (ej: 09:00)
3. Establece hora de fin (ej: 12:00)
4. Haz clic en "Agregar Horario"

**Eliminar Horario:**
- Haz clic en el botón "Eliminar" junto al horario que desees quitar
- Confirma la acción

### 3. **Ver Horas Disponibles**
- Pestaña "📅 Horas Disponibles"
- Muestra todos los horarios que el profesor ha establecido
- Visualiza día y rango horario de cada disponibilidad

### 4. **Ver Citas Programadas**
- Pestaña "📋 Mis Citas"
- Información completa de cada cita:
  - Nombre del estudiante
  - Email de contacto
  - Materia/Asignatura
  - Fecha y hora
  - Notas especiales
  
**Acciones sobre citas:**
- 🟢 **Confirmar** - Acepta la cita
- 🔴 **Cancelar** - Rechaza o cancela la cita

---

## API Endpoints

### Obtener Datos del Profesor
```
GET /api/teacher/schedules/{teacherId}
```
Retorna horarios y citas del profesor

### Agregar Horario Disponible
```
POST /api/teacher/schedules/{teacherId}
Body: {
  "day": "lunes",
  "startTime": "09:00",
  "endTime": "12:00"
}
```

### Eliminar Horario
```
DELETE /api/teacher/schedules/{teacherId}/{hourIndex}
```

### Confirmar Cita
```
POST /api/teacher/appointments/{teacherId}/confirm/{appointmentId}
```

### Cancelar Cita
```
DELETE /api/teacher/appointments/{teacherId}/{appointmentId}
```

### Obtener Todos los Horarios (Para Estudiantes)
```
GET /api/teacher/all-schedules
```
Retorna los horarios de todos los profesores

---

## Integración con Booking del Estudiante

Los horarios configurados en el panel del profesor se sincronizan automáticamente con la interfaz de reserva del estudiante:

1. **Carga Automática** - El booking.html obtiene todos los horarios disponibles
2. **Visualización en Tiempo Real** - Los estudiantes ven solo profesores con horas disponibles
3. **Restricciones** - Los estudiantes no pueden reservar fuera de los horarios permitidos

---

## Base de Datos

Los datos se almacenan en `public/api/teacher_schedules.json`:

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
          "endTime": "10:00",
          "duration": "60",
          "notes": "Ayuda con cálculo integral"
        }
      ]
    }
  ]
}
```

---

## Flujo de Trabajo Típico

### Para el Profesor:
1. **Accede** a `teacher_dashboard.html`
2. **Agrega horarios** disponibles para la semana
3. **Ve las citas** que estudiantes han reservado
4. **Confirma o cancela** según sea necesario

### Para el Estudiante:
1. **Accede** a `booking.html`
2. **Ve profesores** con horas disponibles
3. **Selecciona profesor y hora** disponible
4. **Completa la reserva**

---

## Próximas Funcionalidades

🔄 **Sincronización con Google Calendar** - Eventos automáticos
📧 **Notificaciones por Email** - Confirmación de citas
📱 **App Móvil** - Panel responsivo para dispositivos
💳 **Procesamiento de Pagos** - Integración de pago por citas

---

## Soporte

Para dudas o problemas, contacta a: **info@holaplat.com**

---

**Última actualización:** Noviembre 12, 2025
