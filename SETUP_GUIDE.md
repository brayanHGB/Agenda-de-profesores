# 📖 GUÍA DE CONFIGURACIÓN INICIAL

## Para Nuevos Colaboradores

Este documento te ayudará a configurar el proyecto de la manera más rápida y sencilla.

---

## ✅ Pre-requisitos

- **Node.js v14+** - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- **Git** (opcional, para clonar)

Verifica que tengas todo:
```bash
node -v  # Debe mostrar v14 o superior
npm -v   # Debe mostrar una versión
```

---

## 🎯 Pasos de Instalación

### 1. Clonar el Repositorio
```bash
git clone <URL>
cd "agenda de profesores"
```

O si prefieres sin Git, descarga el ZIP y descomprime.

### 2. Instalar Dependencias
```bash
npm install
```

Esto instalará:
- ✅ Express (servidor backend)
- ✅ CORS (para solicitudes cross-origin)

**Espera a que termine, puede tardar 1-2 minutos.**

### 3. Verificar la Instalación
```bash
npm list
```

Deberías ver:
```
├── cors@2.x.x
└── express@4.x.x
```

---

## 🚀 Ejecutar el Proyecto

### Opción A: Dos Terminales (Recomendado)

**En la Terminal 1:**
```bash
node server.js
```

**En la Terminal 2 (nueva ventana):**
```bash
npx http-server public -p 8080
```

**Luego abre el navegador:**
```
http://localhost:8080
```

### Opción B: Una Terminal (Linux/Mac)
```bash
node server.js & npx http-server public -p 8080
```

### Opción C: Con Scripts (Windows)
Crea un archivo `run.bat`:
```batch
@echo off
start "Backend" cmd /k node server.js
start "Frontend" cmd /k npx http-server public -p 8080
```

Luego simplemente ejecuta:
```bash
run.bat
```

---

## 🧪 Probar que Todo Funciona

### Test 1: Backend
Abre en el navegador:
```
http://localhost:3001/api/teachers
```

Deberías ver un JSON con la lista de profesores.

### Test 2: Frontend
```
http://localhost:8080
```

Deberías ver la página de inicio de la plataforma.

### Test 3: Crear Usuario
1. Click en "Regístrate"
2. Completa el formulario
3. Selecciona rol
4. Click en "Crear Cuenta"
5. Debería redirigir a tu perfil

---

## 📁 Estructura Básica

```
agenda de profesores/
│
├── public/                    ← Frontend (HTML, CSS, JS)
│   ├── *.html                ← Páginas
│   ├── *.js                  ← Scripts
│   ├── api/                  ← Base de datos (JSON)
│   └── css/                  ← Estilos
│
├── server.js                 ← Backend (Express)
├── package.json              ← Configuración
└── README.md                 ← Documentación
```

---

## 🔧 Configuración Común

### Cambiar Puerto del Backend
En `server.js`, línea 1:
```javascript
const PORT = 3001; // Cambiar a otro número
```

### Cambiar Puerto del Frontend
```bash
npx http-server public -p 9000  # Cambiar 9000 por otro puerto
```

### Detener los Servidores
```
Windows/Linux/Mac: Ctrl + C
```

---

## 📚 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `server.js` | Servidor Express y API |
| `public/index.html` | Página de inicio |
| `public/log_in.html` | Login/Registro |
| `public/api/teachers.json` | Base de datos de profesores |
| `public/api/teacher_schedules.json` | Horarios y citas |
| `package.json` | Dependencias del proyecto |

---

## 🆘 Solución Rápida de Problemas

### "EADDRINUSE: address already in use"
Otro proceso está usando el puerto. Soluciones:

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /PID <numero> /F
```

**Mac/Linux:**
```bash
lsof -i :3001
kill -9 <PID>
```

O simplemente usa otro puerto (3002, 3003, etc.)

### "Cannot find module 'express'"
```bash
npm install
npm install express cors
```

### "localhost:8080 not responding"
1. Verifica que Terminal 2 está corriendo
2. Abre http://127.0.0.1:8080
3. Limpia caché (Ctrl+Shift+Del)

### "Los datos no se guardan"
1. Abre DevTools (F12)
2. Ve a Application → LocalStorage
3. Si está vacío, los datos se guardaron pero con error
4. Abre la consola y busca errores rojos

---

## 📝 Próximos Pasos

1. ✅ Instalar (`npm install`)
2. ✅ Ejecutar servers
3. ✅ Probar usuario nuevo
4. ✅ Explorar las páginas
5. 👉 Ahora sí, ¡empezar a programar!

---

## 🎓 Para Continuar Desarrollo

- **Leer `README.md`** - Documentación completa
- **Explorar `server.js`** - Entender la API
- **Revisar HTML files** - Entender la estructura
- **Mirar `package.json`** - Ver dependencias

---

## 💬 Recomendaciones

✅ **Haz commits frecuentes**
```bash
git add .
git commit -m "descripción clara"
git push
```

✅ **Crea ramas para nuevas features**
```bash
git checkout -b feature/nueva-funcionalidad
```

✅ **Mantén la documentación actualizada**
- Si agregas features, actualiza README.md

✅ **Sigue el estilo de código existente**
- Revisa otros archivos para mantener consistencia

---

## 🎉 ¡Listo!

Ya deberías poder:
- ✅ Clonar el repositorio
- ✅ Instalar dependencias
- ✅ Ejecutar el proyecto
- ✅ Crear usuarios y probar funcionalidades
- ✅ Agregar nuevas features

**¿Preguntas?** Revisa `README.md` o los archivos de documentación adicional.

**¡Bienvenido al equipo de desarrollo!** 🚀
