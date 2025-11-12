// Archivo: public/js/google-calendar-config.js
// Este archivo contiene la configuración de Google Calendar
// 
// INSTRUCCIONES:
// 1. Reemplaza los valores YOUR_* con tus credenciales de Google Cloud
// 2. No commits este archivo si tiene credenciales reales
// 3. Para producción, usa variables de entorno

export const GOOGLE_CALENDAR_CONFIG = {
  // Tu Client ID de Google Cloud Console
  // Obtenlo en: https://console.cloud.google.com/apis/credentials
  CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  
  // Tu API Key
  // Obtenlo en: https://console.cloud.google.com/apis/credentials
  API_KEY: 'YOUR_GOOGLE_API_KEY',
  
  // Discovery document para Google Calendar API
  DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  
  // Scope de permisos solicitados
  SCOPES: 'https://www.googleapis.com/auth/calendar',
  
  // Configuración de zona horaria (cambia según tu ubicación)
  TIMEZONE: 'America/Bogota',
  
  // Recordatorios por defecto para los eventos (en minutos)
  DEFAULT_REMINDERS: [
    { method: 'email', minutes: 24 * 60 },  // Email 24 horas antes
    { method: 'popup', minutes: 30 }         // Popup 30 minutos antes
  ]
};

// Ejemplo de uso:
// import { GOOGLE_CALENDAR_CONFIG } from './google-calendar-config.js';
// const clientId = GOOGLE_CALENDAR_CONFIG.CLIENT_ID;
