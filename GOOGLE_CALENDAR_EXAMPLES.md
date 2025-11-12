# Ejemplos de Código - Google Calendar Integration

## 1. Cómo cambiar el timezone

Si tu usuario está en una zona diferente a Colombia, cambia:

```javascript
// En public/booking.html, línea ~530

// ANTES (America/Bogota)
const TIMEZONE = 'America/Bogota';

// OPCIONES DE TIMEZONE:
// America/New_York (USA Este)
// America/Los_Angeles (USA Oeste)
// America/Mexico_City (México)
// America/Argentina/Buenos_Aires (Argentina)
// Europe/Madrid (España)
// Europe/London (UK)
// Asia/Tokyo (Japón)
// Asia/Shanghai (China)
// Australia/Sydney (Australia)
```

## 2. Personalizar los recordatorios

```javascript
// En public/booking.html, línea ~600, función addEventToGoogleCalendar()

// ACTUAL (24 horas email + 30 min popup)
reminders: {
    useDefault: false,
    overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 }
    ]
}

// OPCIONES PERSONALIZADAS:

// Solo popup 15 minutos antes
reminders: {
    useDefault: false,
    overrides: [
        { method: 'popup', minutes: 15 }
    ]
}

// Email 3 horas + SMS 30 min
reminders: {
    useDefault: false,
    overrides: [
        { method: 'email', minutes: 180 },
        { method: 'sms', minutes: 30 }
    ]
}

// Recordatorios múltiples
reminders: {
    useDefault: false,
    overrides: [
        { method: 'email', minutes: 24 * 60 },  // 1 día
        { method: 'email', minutes: 2 * 60 },   // 2 horas
        { method: 'popup', minutes: 15 }        // 15 minutos
    ]
}

// Sin recordatorios
reminders: {
    useDefault: false,
    overrides: []
}
```

## 3. Agregar descripción dinámica

```javascript
// En public/booking.html, función addEventToGoogleCalendar()

// ACTUAL
description: `Materia: ${eventDetails.subject}\nNota: ${eventDetails.notes || 'Sin notas'}`

// CON MÁS INFORMACIÓN
description: `
Profesor: ${eventDetails.teacherName}
Materia: ${eventDetails.subject}
Nota del estudiante: ${eventDetails.notes || 'Sin notas'}
Duración: ${eventDetails.duration} minutos
Precio: ${eventDetails.price}
---
Para cambios, contacta a soporte@agenda.com
`.trim()
```

## 4. Validar antes de crear evento

```javascript
// Versión mejorada de addEventToGoogleCalendar()

async function addEventToGoogleCalendar(eventDetails) {
    if (!googleCalendarConnected) {
        console.log('Google Calendar no conectado');
        return false;
    }

    // Validar datos
    if (!eventDetails.teacherName) {
        console.error('Falta nombre del profesor');
        return false;
    }

    if (!eventDetails.startTime) {
        console.error('Falta hora de inicio');
        return false;
    }

    try {
        const event = {
            'summary': `Tutoría con ${eventDetails.teacherName}`,
            'description': `Materia: ${eventDetails.subject}\nNota: ${eventDetails.notes || 'Sin notas'}`,
            'start': {
                'dateTime': eventDetails.startTime,
                'timeZone': 'America/Bogota'
            },
            'end': {
                'dateTime': eventDetails.endTime,
                'timeZone': 'America/Bogota'
            },
            'location': 'Virtual',
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 30 }
                ]
            }
        };

        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        const response = await request;
        console.log('✓ Evento creado:', response.result.htmlLink);
        return true;
        
    } catch (error) {
        console.error('✗ Error al crear evento:', error);
        return false;
    }
}
```

## 5. Guardar registro de eventos creados

```javascript
// Agregar después de crear evento exitosamente

async function saveEventRecord(eventDetails, googleEventId) {
    try {
        // Guardar en backend
        const response = await fetch('http://localhost:3001/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher: eventDetails.teacherName,
                student: eventDetails.studentName,
                subject: eventDetails.subject,
                startTime: eventDetails.startTime,
                endTime: eventDetails.endTime,
                googleEventId: googleEventId,
                notes: eventDetails.notes,
                createdAt: new Date().toISOString()
            })
        });

        if (response.ok) {
            console.log('✓ Registro guardado en DB');
            return true;
        }
    } catch (error) {
        console.error('✗ Error guardando registro:', error);
        return false;
    }
}

// Llamar en submit del formulario:
const savedRecord = await saveEventRecord(eventDetails, response.result.id);
```

## 6. Detectar cambios en Google Calendar

```javascript
// Función para sincronizar eventos (bidireccional)

async function syncGoogleCalendarEvents() {
    if (!googleCalendarConnected) return;

    try {
        // Obtener eventos del últimas 7 días
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': sevenDaysAgo.toISOString(),
            'timeMax': now.toISOString(),
            'showDeleted': true,
            'singleEvents': true,
            'orderBy': 'startTime'
        });

        const response = await request;
        const events = response.result.items || [];

        console.log('Eventos encontrados:', events.length);
        
        // Guardar en DB o state
        return events;

    } catch (error) {
        console.error('Error sincronizando:', error);
        return [];
    }
}

// Llamar cada 30 segundos
setInterval(syncGoogleCalendarEvents, 30000);
```

## 7. Manejo de errores mejorado

```javascript
// Wrapper para manejo de errores

function handleCalendarError(error, context) {
    console.error(`[${context}]`, error);

    // Clasificar error
    if (error.result?.error?.code === 401) {
        // Unauthorized - Token expiró
        console.log('Token expirado, reconectando...');
        googleCalendarConnected = false;
        updateCalendarStatus(false);
        alert('Tu sesión de Google ha expirado. Por favor, reconecta.');
        
    } else if (error.result?.error?.code === 403) {
        // Forbidden - Permisos insuficientes
        alert('No tienes permiso para acceder a Google Calendar');
        
    } else if (error.result?.error?.code === 404) {
        // Not Found
        alert('Calendario no encontrado');
        
    } else {
        // Error genérico
        alert('Error al sincronizar con Google Calendar. Intenta de nuevo.');
    }
}

// Usar en try-catch
try {
    await addEventToGoogleCalendar(eventDetails);
} catch (error) {
    handleCalendarError(error, 'addEventToGoogleCalendar');
}
```

## 8. Desconectar completamente

```javascript
// Función mejorada para desconectar

function disconnectGoogleCalendar() {
    try {
        const auth2 = gapi.auth2.getAuthInstance();
        
        auth2.signOut().then(() => {
            // Limpiar estado
            googleAuthToken = null;
            googleCalendarConnected = false;
            
            // Limpiar localStorage
            localStorage.removeItem('googleCalendarToken');
            localStorage.removeItem('googleCalendarUser');
            
            // Actualizar UI
            updateCalendarStatus(false);
            
            console.log('✓ Desconectado de Google Calendar');
        });
    } catch (error) {
        console.error('Error desconectando:', error);
    }
}
```

## 9. Persistencia de sesión

```javascript
// Guardar token para sesión persistente

function initGoogleCalendar() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            clientId: GOOGLE_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            const auth2 = gapi.auth2.getAuthInstance();
            
            // Verificar si ya está autenticado
            if (auth2.isSignedIn.get()) {
                const user = auth2.currentUser.get();
                const profile = user.getBasicProfile();
                
                googleAuthToken = user.getAuthResponse().id_token;
                googleCalendarConnected = true;
                
                // Guardar en localStorage
                localStorage.setItem('googleCalendarToken', googleAuthToken);
                localStorage.setItem('googleCalendarUser', profile.getEmail());
                
                updateCalendarStatus(true);
            }
        });
    });
}

// Restaurar sesión al cargar
window.addEventListener('load', () => {
    const savedToken = localStorage.getItem('googleCalendarToken');
    if (savedToken) {
        googleAuthToken = savedToken;
        googleCalendarConnected = true;
        updateCalendarStatus(true);
    }
});
```

## 10. Testing - Simular sin Google

```javascript
// Para desarrollo/testing sin credenciales reales

const MOCK_MODE = true;

async function addEventToGoogleCalendar(eventDetails) {
    if (MOCK_MODE) {
        // Simular creación de evento
        console.log('🔍 MOCK MODE - Evento simulado:', eventDetails);
        
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            mockId: 'mock-' + Date.now()
        };
    }
    
    // Código real...
    if (!googleCalendarConnected) {
        console.log('Google Calendar no conectado');
        return false;
    }
    // ... resto del código
}

// Cambiar MOCK_MODE a false cuando tengas credenciales reales
```

---

## 💡 Tips Útiles

1. **Debugging en Console**
   ```javascript
   // Ver estado en console
   console.log('Connected:', googleCalendarConnected);
   console.log('Token:', googleAuthToken);
   console.log('Auth2:', gapi.auth2.getAuthInstance());
   ```

2. **Probar con eventos futuros**
   ```javascript
   // Agendar tutoría mañana a las 10:00
   const tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
   ```

3. **Ver errores en red**
   - Abrir DevTools (F12)
   - Tab Network
   - Buscar peticiones a `google.com`

4. **Monitorear creación de eventos**
   ```javascript
   // Agregar logs
   console.time('Google Calendar Event');
   await addEventToGoogleCalendar(eventDetails);
   console.timeEnd('Google Calendar Event');
   ```
