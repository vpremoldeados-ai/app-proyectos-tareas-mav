# App Gestor de Tareas y Proyectos — Vpremoldeados

Sistema de gestión de tareas y proyectos para **Vassallo Fábrica de Premoldeados de Hormigón (VPH)**, Toledo, Córdoba, Argentina.

---

## 📱 Apps

### 1. **Tareas MAV** (`index.html`)
PWA para gestionar tareas diarias con sistema de notificaciones y alertas.

**Características:**
- 9 pestañas: Urgentes, Sin Urgencia, Con Fecha, Para Programar, Para Delegar (Sofía/Gustavo), Completadas, Mi Día, Semana, Compras
- Alertas previas (15 min, 30 min, 1h, 2h) con notificaciones de navegador + sonido
- Tareas con fecha=hoy van automáticamente a Urgentes
- Funciona offline (PWA con service worker)
- Datos guardados en Firebase + fallback localStorage

### 2. **Gestor de Proyectos** (`proyectos.html`)
Sistema jerárquico para planificar mejoras y proyectos.

**Estructura:**
- Ámbito → Área → Proyecto → Fase → Tarea
- Vistas: Hoy, Tablero, Detalle Proyecto, Tareas Sueltas, Reuniones
- Drag & drop en 3 niveles (proyectos, fases, tareas)
- Títulos editables (proyectos, fases, tareas)
- Vista de Reuniones con recordatorios 10 min antes

**Reuniones integradas:**
- Gustavo: Lunes y Jueves, 11:00 hs (pausa de producción)
- Sofía: Lunes y Jueves, 16:00 hs

---

## 🚀 Cómo usar

### Localmente (archivo)
```
1. Descargá index.html y proyectos.html
2. Abrí desde tu navegador (file:///)
3. Los datos se guardan en localStorage del navegador
```

### En línea (GitHub Pages)
```
La app está publicada en:
https://vpremoldeados-ai.github.io/app-proyectos-tareas-mav/
```

---

## 📋 Flujo de trabajo

### **Detección → Delegación → Seguimiento**

1. **Detecto** una mejora en planta o en ventas
2. **Cargo en la app** (Para Delegar → asigno a Gustavo/Sofía, o creo Proyecto si es complejo)
3. **Reunión fija** (Lun/Jue) → reviso en Vista Reuniones → cambio estados

---

## 🛠️ Instalación en GitHub Pages

1. Sube `index.html`, `proyectos.html`, `sw.js` a la rama `main`
2. Ve a Settings → Pages
3. Source: `main` / `root`
4. Guarda
5. En ~3 min estará publicada en `https://vpremoldeados-ai.github.io/app-proyectos-tareas-mav/`

---

## 📱 Características técnicas

- **Framework:** React 18 (UMD, sin build)
- **Estado:** localStorage + Firebase (opcional)
- **PWA:** Service Worker para offline
- **Responsive:** Optimizado para mobile y desktop

---

## 📞 Notas de uso

- **Regla de oro:** "Si no está cargada en la app, no se la pedí"
- Los datos se guardan automáticamente en el navegador
- No necesita conexión a internet para trabajar
- Los cambios se sincronizan entre dispositivos si usás Firebase

---

*Desarrollado para Marcelo Vassallo · VPH · Toledo, Córdoba, Argentina*
