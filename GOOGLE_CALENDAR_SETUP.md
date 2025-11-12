# Guía: Integración con Google Calendar API

## ¿Qué es Google Calendar API?

Google Calendar API permite que tu aplicación acceda al calendario de los usuarios y agregue automáticamente eventos cuando se agendan tutorías.

## Pasos para configurar

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si no tienes un proyecto, crea uno nuevo:
   - Click en el selector de proyecto en la parte superior
   - Click en "Nuevo Proyecto"
   - Asigna un nombre: "Agenda de Profesores"
   - Click en "Crear"

### 2. Habilitar Google Calendar API

1. En el dashboard del proyecto
2. Click en "Habilitar APIs y Servicios"
3. Busca "Google Calendar API"
4. Click en el resultado
5. Click en el botón "Habilitar"

### 3. Crear credenciales OAuth 2.0

1. En el menú izquierdo, ve a "Credenciales"
2. Click en "Crear credenciales" > "ID de cliente OAuth"
3. Si te pide configurar la pantalla de consentimiento:
   - Selecciona "Externo"
   - Click en "Crear"
   - Completa la información:
     - **App name**: "Agenda de Profesores"
     - **User support email**: tu email
     - Agrega tu email en "Emails de contacto de desarrolladores"
     - Click en "Guardar y continuar"
   - Agrega permisos:
     - Click en "Agregar o quitar permisos"
     - Busca "calendar" y selecciona `calendar`
     - Click en "Actualizar"
   - Continúa hasta guardar
4. Vuelve a Credenciales y Click en "Crear credenciales" > "ID de cliente OAuth"
5. Tipo de aplicación: "Aplicación web"
6. Nombre: "Agenda de Profesores"
7. En "URIs autorizados de JavaScript":
   - Agrega: `http://localhost:8080`
   - Agrega: `http://localhost:3000`
8. Click en "Crear"
9. Copia tu **Client ID**

### 4. Obtener la API Key

1. En Credenciales, click en "Crear credenciales" > "Clave de API"
2. Copia tu **API Key**

### 5. Reemplazar las credenciales en booking.html

En el archivo `public/booking.html`, busca estas líneas:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
```

Y reemplaza con tus credenciales:

```javascript
const GOOGLE_CLIENT_ID = 'tu-client-id-aqui.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'tu-api-key-aqui';
```

## Opciones de Seguridad

⚠️ **IMPORTANTE**: Nunca expongas tus credenciales en producción.

Para producción, considera:

1. **Backend OAuth Flow**: Maneja las credenciales en el servidor (más seguro)
2. **Variables de entorno**: Usa archivos `.env` para guardar credenciales
3. **Restricciones de API**: En Google Cloud Console, limita tu API Key a:
   - URLs de referencia específicas
   - Solo APIs autorizadas

## Ejemplo de uso

Una vez configurado, cuando un usuario agende una tutoría:

1. Sistema pide permiso para acceder a Google Calendar
2. Usuario autoriza
3. Evento se crea automáticamente en su calendario
4. Recibe recordatorios automáticos

## Solución de problemas

### "CORS error"
- Asegúrate de haber agregado `http://localhost:8080` en URIs autorizados
- Limpia el cache del navegador

### "Popup bloqueado"
- El navegador está bloqueando el popup de Google
- Permite popups para este sitio

### "Client ID inválido"
- Verifica que copiaste el Client ID completo
- Incluye la parte `.apps.googleusercontent.com`

## Recursos adicionales

- [Google Calendar API Docs](https://developers.google.com/calendar/api/guides/overview)
- [OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [JavaScript Client Library](https://developers.google.com/identity/libraries/gsi/client-library)
