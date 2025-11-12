# 👥 INSTRUCCIONES PARA EL EQUIPO DE DESARROLLO

## ¡Proyecto en GitHub! 🎉

El proyecto ya está en GitHub y listo para que todos trabajen juntos.

---

## 🔗 Acceso al Repositorio

**URL:** https://github.com/brayanHGB/Agenda-de-profesores.git

---

## 📥 Clonar el Proyecto (Primer paso)

### Para Windows:
```bash
git clone https://github.com/brayanHGB/Agenda-de-profesores.git
cd Agenda-de-profesores
```

### Para Mac/Linux:
```bash
git clone https://github.com/brayanHGB/Agenda-de-profesores.git
cd Agenda-de-profesores
```

---

## 🚀 Configurar Ambiente Local

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar en Dos Terminales

**Terminal 1 - Backend:**
```bash
node server.js
```

**Terminal 2 - Frontend:**
```bash
npx http-server public -p 8080
```

### 3. Abrir en Navegador
```
http://localhost:8080
```

✅ Si ves la página de inicio, ¡todo está funcionando!

---

## 👨‍💻 Flujo de Trabajo en Equipo

### 1️⃣ Antes de Empezar tu Día
```bash
git pull origin main
```
Esto descarga los últimos cambios del equipo.

### 2️⃣ Crear una Rama para tu Trabajo
```bash
git checkout -b feature/tu-nombre-feature
```

**Ejemplo:**
```bash
git checkout -b feature/agregar-pagos
git checkout -b feature/mejorar-calendario
git checkout -b feature/corregir-bugs-perfil
```

### 3️⃣ Hacer tus Cambios
- Edita los archivos que necesites
- Prueba en tu navegador
- Verifica que todo funcione

### 4️⃣ Guardar tus Cambios (Commits)
```bash
git add .
git commit -m "Descripción clara de qué hiciste"
```

**Ejemplos buenos:**
```bash
git commit -m "Agregar validación de email en registro"
git commit -m "Mejorar estilos del dashboard de profesores"
git commit -m "Corregir bug en sincronización de horarios"
```

**Ejemplos malos:**
```bash
git commit -m "cambios"
git commit -m "fix"
git commit -m "actualizar"
```

### 5️⃣ Subir tu Trabajo a GitHub
```bash
git push origin feature/tu-nombre-feature
```

### 6️⃣ Crear un Pull Request (PR)
1. Ve a https://github.com/brayanHGB/Agenda-de-profesores
2. Click en "Pull Requests"
3. Click en "New Pull Request"
4. Selecciona tu rama
5. Escribe descripción clara
6. Click en "Create Pull Request"

### 7️⃣ Esperar Revisión
- El/la propietario del proyecto revisará tu código
- Puede pedir cambios o dar aprobación
- Una vez aprobado, merge a main

### 8️⃣ Actualizar tu rama main local
```bash
git checkout main
git pull origin main
```

---

## 📁 Estructura del Proyecto

```
Agenda-de-profesores/
├── public/                    ← Frontend (páginas HTML)
│   ├── index.html            ← Página de inicio
│   ├── log_in.html           ← Login y registro
│   ├── booking.html          ← Búsqueda de tutores
│   ├── teacher_dashboard.html ← Panel de profesor
│   ├── teacher_profile.html  ← Perfil de profesor
│   ├── student_profile.html  ← Perfil de estudiante
│   ├── api/                  ← Datos (JSON)
│   │   ├── teachers.json
│   │   └── teacher_schedules.json
│   ├── css/                  ← Estilos
│   │   ├── styles.css
│   │   ├── nav-bar.css
│   │   └── lottie.css
│   └── js/                   ← Scripts
│       ├── log_in.js
│       ├── scripts.js
│       └── google-calendar-config.example.js
│
├── server.js                 ← Backend (Express)
├── package.json              ← Dependencias
│
└── 📚 DOCUMENTACIÓN
    ├── README.md             ← Documentación principal
    ├── SETUP_GUIDE.md        ← Guía de setup
    ├── QUICK_START.md        ← Inicio rápido
    ├── PARA_EL_EQUIPO.md     ← Este archivo
    └── Otros...
```

---

## 🔧 Qué Puedes Modificar

### 📄 Frontend (HTML/CSS/JavaScript)
- Archivos: `public/*.html` y `public/css/*.css`
- Cambios: Diseño, funcionalidades, interfaz
- ⚠️ Cuidado: Usa nombres de clases/IDs consistentes

### ⚙️ Backend (API)
- Archivo: `server.js`
- Cambios: Agregar endpoints, lógica del servidor
- ⚠️ Importante: No cambies puertos sin avisar

### 💾 Base de Datos (JSON)
- Archivos: `public/api/*.json`
- Cambios: Agregar datos de ejemplo, estructura
- ⚠️ Nota: Esto es temporal, luego será una BD real

### 🎨 Estilos (CSS)
- Archivos: `public/css/*.css`
- Cambios: Colores, layout, animaciones
- 🎯 Mantén el color principal: `#0f172a` (negro oscuro)

---

## ❌ Qué NO Hacer

❌ **No modificar archivos ajenos sin coordinar**
- Avisa si vas a cambiar archivo que otro compañero está usando

❌ **No hacer commits directamente a main**
- Siempre crear rama → hacer cambios → PR

❌ **No subir archivos de configuración personal**
- `.env`, credenciales, archivos grandes

❌ **No modificar sin probar**
- Prueba localmente antes de hacer commit

❌ **No hacer push forzado (`-f`)**
- Solo el propietario usa esto

---

## 📞 Problemas Comunes

### "fatal: not a git repository"
**Solución:**
```bash
cd "ruta/del/proyecto"  # Asegúrate de estar en la carpeta correcta
```

### "Your branch is ahead of 'origin/main' by X commits"
**Solución:**
```bash
git push origin feature/tu-rama
```

### "CONFLICT: merge conflict in [archivo]"
**Solución:**
1. Abre el archivo con conflicto
2. Busca las marcas `<<<<<<<` y `>>>>>>>`
3. Elige qué código mantener
4. Guarda el archivo
5. `git add .` y `git commit`

### "Changes not staged for commit"
**Solución:**
```bash
git add .              # Agregar cambios al staging
git commit -m "..."    # Confirmar cambios
git push               # Subir a GitHub
```

### "node_modules no están sincronizados"
**Solución:**
```bash
npm install            # Reinstalar dependencias
```

---

## 📝 Convenciones de Código

### Nombres de Ramas
```
feature/nombre-del-feature    ← Nuevas funcionalidades
bugfix/nombre-del-bug         ← Correcciones
docs/nombre-doc               ← Documentación
refactor/nombre-refactor      ← Mejoras de código
```

### Commits Claros
- **Primeras líneas:** Breve resumen (50 caracteres)
- **Después:** Descripción detallada si es necesario

**Ejemplo:**
```
Agregar validación de email en formulario de registro

- Valida formato de email con regex
- Muestra error si el email ya existe
- Usa localStorage para persistencia
- Fixes #15
```

### Código
- Usa variables descriptivas: `teacherName` no `tn`
- Agrega comentarios en lógica compleja
- Mantén funciones pequeñas y enfocadas
- Sigue el estilo existente

---

## 🎯 Próximos Pasos

1. ✅ Clonar el repositorio
2. ✅ Instalar dependencias (`npm install`)
3. ✅ Ejecutar el proyecto
4. ✅ Explorar el código
5. ✅ Crear tu rama
6. ✅ Hacer cambios
7. ✅ Hacer commits
8. ✅ Push a GitHub
9. ✅ Crear PR

---

## 📚 Documentación Importante

Antes de empezar, lee:
1. **README.md** - Qué es el proyecto
2. **SETUP_GUIDE.md** - Cómo instalarlo
3. **QUICK_START.md** - Guía rápida
4. **Este archivo** - Cómo trabajar en equipo

---

## 💬 Comunicación en el Equipo

✅ **Usa Issues de GitHub para:**
- Reportar bugs
- Sugerir features
- Discutir cambios grandes

✅ **Usa Pull Requests para:**
- Solicitar revisión de código
- Discutir implementación
- Historial de cambios

✅ **Otros canales (Slack, email, etc.):**
- Contacto urgente
- Coordinación de horarios
- Llamadas de coordinación

---

## ✨ Ejemplo Práctico de Workflow

### Día 1: Empezar a trabajar
```bash
# Descargar últimos cambios
git pull origin main

# Crear rama para nueva feature
git checkout -b feature/agregar-notificaciones

# Editar archivos...
# Probar en navegador...

# Guardar cambios
git add .
git commit -m "Agregar sistema de notificaciones por email"

# Subir a GitHub
git push origin feature/agregar-notificaciones
```

### En GitHub:
- Crear Pull Request
- Descripción: Qué cambió y por qué
- Esperar revisión

### Día 2: Después de aprobación
```bash
# (El propietario hace merge en GitHub)

# Actualizar tu rama main
git checkout main
git pull origin main

# Borrar rama local (opcional)
git branch -d feature/agregar-notificaciones
```

---

## 🎉 ¡Listo para trabajar!

**Preguntas frecuentes:**
- 📖 Lee README.md
- 🔧 Lee SETUP_GUIDE.md
- ⚙️ Pregunta a los compañeros
- 💬 Abre un Issue en GitHub

**¡Bienvenido al equipo!** 🚀
