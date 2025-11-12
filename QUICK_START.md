# ⚡ Guía Rápida - Panel de Profesores

## Acceso Rápido

### Panel del Profesor
🔗 **URL**: http://localhost:8080/teacher_dashboard.html

### Booking del Estudiante
🔗 **URL**: http://localhost:8080/booking.html

---

## 5 Pasos Rápidos para Probar

### Paso 1: Inicia los servidores
```bash
# Terminal 1: Backend
node server.js

# Terminal 2: Frontend
npx http-server public -p 8080
```

### Paso 2: Abre el Panel del Profesor
```
http://localhost:8080/teacher_dashboard.html
```

### Paso 3: Agrega un Horario
1. Click en "➕ Agregar Horario"
2. Selecciona "Lunes"
3. Hora inicio: 09:00
4. Hora fin: 12:00
5. Click "Agregar Horario"

### Paso 4: Abre el Booking de Estudiante
```
http://localhost:8080/booking.html
```

### Paso 5: Verifica Sincronización
- Ve la lista de profesores
- Haz clic en "Carlos Martínez" (el profesor que agregaste horario)
- Observa los horarios disponibles que acabas de crear
- ¡Los horarios se sincronizaron automáticamente! 🎉

---

## Lo Que Sucede Detrás de Escenas

```
1. Profesor agrega horario → teacher_dashboard.html
   ↓
2. Envía POST a /api/teacher/schedules/1
   ↓
3. Backend guarda en teacher_schedules.json
   ↓
4. Estudiante abre booking.html
   ↓
5. Hace GET a /api/teacher/all-schedules
   ↓
6. Ve los horarios del profesor actualizado
   ↓
7. Puede reservar en ese horario
```

---

## Funcionalidades Clave

### ✅ Panel del Profesor
- [x] Ver información personal
- [x] Agregar horarios disponibles
- [x] Ver citas programadas
- [x] Confirmar/Cancelar citas
- [x] Estadísticas (total citas, horas disponibles)

### ✅ Booking del Estudiante
- [x] Ver lista de profesores
- [x] Buscar por materia
- [x] Ver horarios disponibles en tiempo real
- [x] Seleccionar profesor y horario
- [x] Completar reserva

### ✅ Backend
- [x] API para profesores
- [x] API para estudiantes
- [x] Sincronización automática
- [x] Persistencia de datos

---

## Datos de Prueba

### Profesores Precargados
1. **Carlos Martínez** - Matemáticas
   - Lunes-Jueves: 09:00-12:00
   - Viernes: 15:00-19:00

2. **Ana López** - Inglés
   - Lunes, Miércoles, Viernes: 10:00-13:00

3. **Roberto Silva** - Programación
   - Martes, Jueves, Sábado: 15:00-19:00

### Citas Precargadas
- Juan Pérez con Carlos Martínez (Lunes 09:00)
- María García con Carlos Martínez (Lunes 11:00)
- Pedro Rodríguez con Roberto Silva (Martes 15:00)

---

## Solución de Problemas

### ❌ Error: Port 3001 already in use
```bash
# Solución: Matar el proceso anterior
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3001
kill -9 <PID>
```

### ❌ Error: Cannot GET /api/teacher/all-schedules
```bash
# Solución: Verifica que el servidor esté corriendo
# Intenta acceder a http://localhost:3001 en el navegador
```

### ❌ Datos no se sincronizan
```bash
# Solución: Refresca ambas páginas
# Limpia el cache del navegador (Ctrl+Shift+Del)
```

---

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `server.js` | Backend con API endpoints |
| `teacher_dashboard.html` | Panel del profesor |
| `booking.html` | Interfaz del estudiante |
| `public/api/teachers.json` | BD de profesores |
| `public/api/teacher_schedules.json` | BD de horarios y citas |

---

## Próximos Pasos

1. **Agregar autenticación** - Solo los profesores autorizados puedan acceder
2. **Notificaciones** - Email cuando hay nueva cita
3. **Google Calendar** - Sincronizar citas automáticamente
4. **Pagos** - Sistema de pago integrado
5. **Analytics** - Reportes de ingresos y horas trabajadas

---

## API Rápida

### Obtener Horarios de un Profesor
```bash
curl http://localhost:3001/api/teacher/schedules/1
```

### Obtener Todos los Horarios
```bash
curl http://localhost:3001/api/teacher/all-schedules
```

### Agregar Horario
```bash
curl -X POST http://localhost:3001/api/teacher/schedules/1 \
  -H "Content-Type: application/json" \
  -d '{"day":"lunes","startTime":"09:00","endTime":"12:00"}'
```

---

**¡Listo para comenzar!** 🎉

Ahora puedes:
1. Abrir http://localhost:8080/teacher_dashboard.html
2. Agregar horarios
3. Ir a http://localhost:8080/booking.html
4. ¡Ver cómo se sincronizan automáticamente!
