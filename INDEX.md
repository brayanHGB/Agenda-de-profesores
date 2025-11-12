# 📚 DOCUMENTACIÓN DEL PROYECTO

## 🚀 Comienza Aquí

### Para Nuevos Colaboradores (PRIMERO LEE ESTO):
1. **[PARA_EL_EQUIPO.md](PARA_EL_EQUIPO.md)** - Cómo trabajar en equipo con Git
2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Instalación paso a paso
3. **[README.md](README.md)** - Documentación técnica completa

---

## 📖 Documentación Técnica

- **[README.md](README.md)** - Documentación principal del proyecto
- **[QUICK_START.md](QUICK_START.md)** - Guía rápida (5 minutos)
- **[SETUP.md](SETUP.md)** - Configuración detallada
- **[TEACHER_PANEL_GUIDE.md](TEACHER_PANEL_GUIDE.md)** - Guía del panel de profesores
- **[SYNC_ARCHITECTURE.md](SYNC_ARCHITECTURE.md)** - Arquitectura de sincronización

---

## 🔐 Google Calendar (Opcional)

- **[GOOGLE_CALENDAR_SETUP.md](GOOGLE_CALENDAR_SETUP.md)** - Configuración de Google Calendar
- **[GOOGLE_CALENDAR_FEATURES.md](GOOGLE_CALENDAR_FEATURES.md)** - Características disponibles

**Nota:** Google Calendar es opcional. El proyecto funciona sin él.

---

## 📁 Estructura de Carpetas (LIMPIA)

```
/c/Users/Administrator/Desktop/agenda de profesores/
│
├── public/                          ← Frontend (HTML, CSS, JS)
│   ├── index.html                  ← Página de inicio
│   ├── log_in.html                 ← Login/Registro
│   ├── booking.html                ← Búsqueda de tutores
│   ├── teacher_dashboard.html      ← Panel del profesor
│   ├── teacher_profile.html        ← Perfil del profesor
│   ├── student_profile.html        ← Perfil del estudiante
│   │
│   ├── api/                        ← Base de datos (JSON)
│   │   ├── teachers.json           ← Lista de profesores
│   │   └── teacher_schedules.json  ← Horarios y citas
│   │
│   ├── css/                        ← Estilos CSS
│   │   ├── styles.css              ← Estilos principales
│   │   ├── nav-bar.css             ← Navegación
│   │   └── lottie.css              ← Animaciones
│   │
│   ├── js/                         ← Scripts JavaScript
│   │   ├── log_in.js               ← Lógica de login
│   │   └── google-calendar-config.example.js
│   │
│   └── img/                        ← Imágenes y assets
│       ├── favicon.ico
│       └── intro.json              ← Animación Lottie
│
├── server.js                       ← Backend Express
├── package.json                    ← Dependencias Node
├── package-lock.json               ← Lock file
│
├── 📚 DOCUMENTACIÓN (Raíz)
│   ├── INDEX.md                    ← Este archivo
│   ├── README.md                   ← Documentación completa
│   ├── PARA_EL_EQUIPO.md           ← Guía Git y colaboración
│   ├── SETUP_GUIDE.md              ← Instalación paso a paso
│   ├── QUICK_START.md              ← Inicio rápido (5 min)
│   ├── SETUP.md                    ← Configuración avanzada
│   ├── TEACHER_PANEL_GUIDE.md      ← Guía del panel
│   ├── SYNC_ARCHITECTURE.md        ← Arquitectura técnica
│   ├── GOOGLE_CALENDAR_SETUP.md    ← Configurar Google Calendar
│   └── GOOGLE_CALENDAR_FEATURES.md ← Features de Google Calendar
│
├── .git/                           ← Repositorio Git
├── .gitignore                      ← Archivos ignorados
└── node_modules/                   ← Dependencias instaladas
```

---

## ✅ Estado del Proyecto (LIMPIO)

- ✅ No hay carpetas duplicadas
- ✅ Estructura clara y organizada
- ✅ Documentación consolidada
- ✅ Listo para compartir con el equipo

---

## ⚡ Inicio Rápido

```bash
# 1. Clonar
git clone https://github.com/brayanHGB/Agenda-de-profesores.git
cd Agenda-de-profesores

# 2. Instalar
npm install

# 3. Ejecutar (2 terminales)
node server.js                # Terminal 1
npx http-server public -p 8080   # Terminal 2

# 4. Abrir
http://localhost:8080
```

---

## 🎯 Próximos Pasos

1. Lee **PARA_EL_EQUIPO.md** para entender cómo colaborar
2. Sigue **SETUP_GUIDE.md** para instalar localmente
3. Explora el código y comienza a contribuir

---

## 📞 Preguntas?

- 📖 Revisa README.md
- 🔧 Revisa SETUP_GUIDE.md
- 👥 Pregunta a tus compañeros
- 💬 Abre un Issue en GitHub

**¡Feliz desarrollo!** 🚀
