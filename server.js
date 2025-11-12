const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los profesores
app.get('/api/teachers', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'api', 'teachers.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const teachers = JSON.parse(data);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar profesores' });
  }
});

// Ruta para obtener profesores por materia (búsqueda)
app.get('/api/teachers/search', (req, res) => {
  try {
    const subject = req.query.subject ? req.query.subject.toLowerCase() : '';
    const filePath = path.join(__dirname, 'public', 'api', 'teachers.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const allTeachers = JSON.parse(data);

    if (!subject) {
      res.json(allTeachers);
      return;
    }

    const filtered = allTeachers.teachers.filter(teacher =>
      teacher.subject.toLowerCase().includes(subject) ||
      teacher.specialty.toLowerCase().includes(subject) ||
      teacher.description.toLowerCase().includes(subject)
    );

    res.json({ teachers: filtered });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar profesores' });
  }
});

// Ruta para obtener profesores disponibles por materia
app.get('/api/teachers/:subject', (req, res) => {
  try {
    const subject = req.params.subject.toLowerCase();
    const filePath = path.join(__dirname, 'public', 'api', 'teachers.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const allTeachers = JSON.parse(data);

    const filtered = allTeachers.teachers.filter(teacher =>
      teacher.subject.toLowerCase() === subject
    );

    res.json({ teachers: filtered });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Ruta para obtener un profesor específico
app.get('/api/teachers/details/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filePath = path.join(__dirname, 'public', 'api', 'teachers.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const allTeachers = JSON.parse(data);

    const teacher = allTeachers.teachers.find(t => t.id === id);
    if (!teacher) {
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener profesor' });
  }
});

// ===== ENDPOINTS PARA PANEL DEL PROFESOR =====

// Obtener horarios y citas de un profesor
app.get('/api/teacher/schedules/:teacherId', (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const filePath = path.join(__dirname, 'public', 'api', 'teacher_schedules.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const schedules = JSON.parse(data);

    const teacherSchedule = schedules.schedules.find(s => s.teacherId === teacherId);
    if (!teacherSchedule) {
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    res.json(teacherSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
});

// Obtener todos los horarios de profesores (para estudiantes)
app.get('/api/teacher/all-schedules', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'api', 'teacher_schedules.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const schedules = JSON.parse(data);
    res.json(schedules.schedules);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
});

// Agregar horario disponible para un profesor
app.post('/api/teacher/schedules/:teacherId', (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { day, startTime, endTime } = req.body;

    const filePath = path.join(__dirname, 'public', 'api', 'teacher_schedules.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const schedules = JSON.parse(data);

    const teacherSchedule = schedules.schedules.find(s => s.teacherId === teacherId);
    if (!teacherSchedule) {
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    teacherSchedule.availableHours.push({ day, startTime, endTime });
    fs.writeFileSync(filePath, JSON.stringify(schedules, null, 2));

    res.json({ success: true, message: 'Horario agregado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar horario' });
  }
});

// Eliminar horario disponible
app.delete('/api/teacher/schedules/:teacherId/:hourIndex', (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const hourIndex = parseInt(req.params.hourIndex);

    const filePath = path.join(__dirname, 'public', 'api', 'teacher_schedules.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const schedules = JSON.parse(data);

    const teacherSchedule = schedules.schedules.find(s => s.teacherId === teacherId);
    if (!teacherSchedule) {
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    teacherSchedule.availableHours.splice(hourIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(schedules, null, 2));

    res.json({ success: true, message: 'Horario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar horario' });
  }
});

// Confirmar cita
app.post('/api/teacher/appointments/:teacherId/confirm/:appointmentId', (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const appointmentId = req.params.appointmentId;

    const filePath = path.join(__dirname, 'public', 'api', 'teacher_schedules.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const schedules = JSON.parse(data);

    const teacherSchedule = schedules.schedules.find(s => s.teacherId === teacherId);
    if (!teacherSchedule) {
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    const appointment = teacherSchedule.appointments.find(a => a.id === appointmentId);
    if (!appointment) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    appointment.status = 'confirmed';
    fs.writeFileSync(filePath, JSON.stringify(schedules, null, 2));

    res.json({ success: true, message: 'Cita confirmada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al confirmar cita' });
  }
});

// Cancelar cita
app.delete('/api/teacher/appointments/:teacherId/:appointmentId', (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const appointmentId = req.params.appointmentId;

    const filePath = path.join(__dirname, 'public', 'api', 'teacher_schedules.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const schedules = JSON.parse(data);

    const teacherSchedule = schedules.schedules.find(s => s.teacherId === teacherId);
    if (!teacherSchedule) {
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    const appointmentIndex = teacherSchedule.appointments.findIndex(a => a.id === appointmentId);
    if (appointmentIndex === -1) {
      res.status(404).json({ error: 'Cita no encontrada' });
      return;
    }

    teacherSchedule.appointments.splice(appointmentIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(schedules, null, 2));

    res.json({ success: true, message: 'Cita cancelada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar cita' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
