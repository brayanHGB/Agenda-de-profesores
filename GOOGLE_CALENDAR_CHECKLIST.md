# ✅ Checklist de Implementación - Google Calendar

## 📋 Antes de Empezar

- [ ] Tienes una cuenta de Google
- [ ] Tienes acceso a Google Cloud Console
- [ ] Tu aplicación está corriendo en `http://localhost:8080`
- [ ] Backend API está corriendo en `http://localhost:3001`
- [ ] Navegador actualizado (Chrome, Firefox, Safari, Edge)

## 🔧 Configuración Google Cloud

### Paso 1: Crear Proyecto
- [ ] Ve a [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Click en selector de proyecto (arriba)
- [ ] Click en "Nuevo Proyecto"
- [ ] Nombre: "Agenda de Profesores"
- [ ] Crear proyecto
- [ ] Espera a que se cree (puede tomar 1-2 minutos)
- [ ] Seleccionar el nuevo proyecto

### Paso 2: Habilitar Google Calendar API
- [ ] En el dashboard, click "Habilitar APIs y Servicios"
- [ ] Buscar: "Google Calendar API"
- [ ] Click en el resultado
- [ ] Click en botón "Habilitar"
- [ ] Esperar confirmación

### Paso 3: Crear Credenciales
- [ ] En menú izquierdo, click "Credenciales"
- [ ] Click "Crear credenciales"
- [ ] Seleccionar "ID de cliente OAuth"
- [ ] Si pide pantalla de consentimiento:
  - [ ] Seleccionar tipo: "Externo"
  - [ ] Click "Crear"
  - [ ] App name: "Agenda de Profesores"
  - [ ] Email soporte: tu email
  - [ ] Click "Guardar y continuar"
  - [ ] Click "Agregar o quitar permisos"
  - [ ] Buscar "Calendar" en la barra de búsqueda
  - [ ] Seleccionar "calendar"
  - [ ] Click "Actualizar"
  - [ ] Continuar hasta guardar

### Paso 4: Configurar OAuth
- [ ] Tipo de aplicación: "Aplicación web"
- [ ] Nombre: "Agenda de Profesores Web"
- [ ] En "URIs autorizados de JavaScript":
  - [ ] Agregar: `http://localhost:8080`
  - [ ] Agregar: `http://localhost:3000`
  - [ ] Agregar: `http://127.0.0.1:8080`
- [ ] Click "Crear"
- [ ] **COPIAR Y GUARDAR**: Client ID (se muestra en popup)
- [ ] Cerrar popup

### Paso 5: Obtener API Key
- [ ] Volver a "Credenciales"
- [ ] Click "Crear credenciales"
- [ ] Seleccionar "Clave de API"
- [ ] **COPIAR Y GUARDAR**: API Key (se muestra en popup)
- [ ] Cerrar popup

## 📝 Actualizar Código

### En `public/booking.html`

- [ ] Abrir archivo `public/booking.html`
- [ ] Buscar línea con: `const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID`
- [ ] Reemplazar `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` con tu Client ID
- [ ] Buscar línea con: `const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'`
- [ ] Reemplazar `YOUR_GOOGLE_API_KEY` con tu API Key
- [ ] Guardar archivo (Ctrl+S)
- [ ] Verificar que no hay errores de sintaxis

**Ejemplo de cómo debe verse:**
```javascript
const GOOGLE_CLIENT_ID = 'abc123def456ghi.apps.googleusercontent.com';
const GOOGLE_API_KEY = 'AIzaSyD1234567890abcdefghijk';
```

## 🧪 Probar Localmente

### En navegador
- [ ] Abrir `http://localhost:8080/booking.html`
- [ ] Esperar a que cargue la página
- [ ] Scroll hacia abajo
- [ ] Ver sección "📅 Sincronizar con Google Calendar"
- [ ] Ver botón "Conectar con Google Calendar"

### Conectar Google Calendar
- [ ] Click en botón "Conectar con Google Calendar"
- [ ] Se abre popup de Google
- [ ] Seleccionar tu cuenta Google
- [ ] Ingresar contraseña (si pide)
- [ ] Ver pantalla: "Agenda de Profesores solicita permiso"
- [ ] Click en "Ver detalles"
- [ ] Scroll y ver permisos solicitados
- [ ] Click en botón azul "Permitir"
- [ ] Volver a página de booking
- [ ] **Verificar**: Botón ahora dice "Desconectar Google Calendar"
- [ ] **Verificar**: Aparece mensaje "✓ Conectado a Google Calendar"

### Agendar Tutoría
- [ ] Seleccionar un profesor de la lista
- [ ] Llenar formulario:
  - [ ] Tu Nombre (ej: "Juan Pérez")
  - [ ] Email (ej: "juan@email.com")
  - [ ] Teléfono (opcional)
  - [ ] Fecha (ej: mañana)
  - [ ] Duración (ej: "1 hora - $25")
  - [ ] Hora (ej: "09:00 AM")
  - [ ] Notas (ej: "Necesito ayuda con cálculo")
  - [ ] Check en "Acepto los términos"
- [ ] Click en "Agendar Tutoría"
- [ ] **Verificar**: Aparece modal "¡Tutoría Agendada!"
- [ ] Click en "Volver al Inicio"

### Verificar en Google Calendar
- [ ] Ir a [Google Calendar](https://calendar.google.com)
- [ ] Ver si aparece el nuevo evento
- [ ] Verificar:
  - [ ] Título: "Tutoría con {nombre profesor}"
  - [ ] Fecha: La que seleccionaste
  - [ ] Hora: La que seleccionaste
  - [ ] Descripción: Incluye materia y notas

## 🐛 Troubleshooting

### El botón no aparece
- [ ] Limpiar cache (Ctrl+Shift+Del)
- [ ] Recargar página (F5)
- [ ] Verificar que `booking.html` tiene las líneas de Google Calendar

### Error "CORS"
- [ ] Verificar credenciales correctas
- [ ] Asegurar que `http://localhost:8080` está en URIs autorizados
- [ ] Limpiar cache
- [ ] Reiniciar navegador

### Popup bloqueado
- [ ] Permitir popups para `localhost:8080`
- [ ] En Chrome: Click en icono popup bloqueado en URL bar
- [ ] En Firefox: Permitir para este sitio
- [ ] Intentar de nuevo

### "Cliente ID inválido"
- [ ] Copiar Client ID completo (con `.apps.googleusercontent.com`)
- [ ] Verificar no haya espacios extras
- [ ] Verificar comillas (deben ser rectas `'`, no curvas `'`)

### No aparece en Google Calendar
- [ ] Verificar que está conectado (check azul)
- [ ] Revisar timezone (debe ser `America/Bogota`)
- [ ] Abrir Google Calendar en otra pestaña
- [ ] Refrescar Google Calendar (Ctrl+R)
- [ ] Revisar "Otros calendarios" (puede estar colapsado)

## 📦 Archivos de Documentación Incluidos

- [ ] `SETUP.md` - Setup general del proyecto
- [ ] `GOOGLE_CALENDAR_SETUP.md` - Guía detallada
- [ ] `GOOGLE_CALENDAR_README.md` - Resumen completo
- [ ] `GOOGLE_CALENDAR_FEATURES.md` - Características
- [ ] `GOOGLE_CALENDAR_FLOW.md` - Flujos y diagramas
- [ ] `GOOGLE_CALENDAR_EXAMPLES.md` - Ejemplos de código

## 🎓 Próximos Pasos Recomendados

**Fase 1: Verificar que funciona**
- [ ] Probar localmente como se describe arriba
- [ ] Crear 2-3 eventos de prueba
- [ ] Verificar que aparecen en Google Calendar
- [ ] Compartir con equipo para que pruebe

**Fase 2: Mejorar (opcional)**
- [ ] Cambiar timezone según ubicación
- [ ] Personalizar recordatorios
- [ ] Agregar más campos a descripción
- [ ] Implementar historial de eventos

**Fase 3: Seguridad (antes de producción)**
- [ ] Mover credenciales a variables de entorno
- [ ] Implementar backend OAuth flow
- [ ] Restringir API Key en Google Cloud
- [ ] Agregar validaciones adicionales
- [ ] Implementar logging y monitoreo

**Fase 4: Producción**
- [ ] Cambiar URLs de localhost a dominio real
- [ ] Obtener certificado SSL/HTTPS
- [ ] Configurar variables de entorno
- [ ] Hacer pruebas finales
- [ ] Monitorear errores

## 📞 Contactos y Recursos

### Google Calendar API
- 📖 [Documentación oficial](https://developers.google.com/calendar)
- 🔧 [Guía de setup OAuth](https://developers.google.com/identity/protocols/oauth2)
- 🎓 [Codelabs](https://codelabs.developers.google.com/calendar)

### Comunidad
- 💬 [Stack Overflow - google-calendar-api](https://stackoverflow.com/questions/tagged/google-calendar-api)
- 🐛 [Google Issue Tracker](https://issuetracker.google.com/issues?q=status:open%20componentid:187119)
- 👥 [Google Developers Community](https://developers.google.com/community)

### Soporte Local
- 👨‍💻 Revisit documentación: `GOOGLE_CALENDAR_*.md`
- 🔍 Revisar ejemplos: `GOOGLE_CALENDAR_EXAMPLES.md`
- ❓ Usar Developer Tools (F12) para debugging

## ✨ ¡Completado!

Una vez hayas completado todos los checkpoints:
- ✅ Tienes Google Calendar integrado
- ✅ Los eventos se crean automáticamente
- ✅ Los usuarios pueden conectar sus calendarios
- ✅ Todo funciona sin errores

**¡Felicidades! 🎉 Tu aplicación está lista para usar con Google Calendar.**

---

**Última actualización**: 2025-11-12
**Estado**: ✅ Implementado y documentado completamente
