# 📍 ESTADO ACTUAL — App Mis Gestiones (VPH)

> Punto de partida para una sesión nueva. Última actualización: 2026-08-03.

---

## 🔗 Accesos

- **App en producción:** https://vpremoldeados-ai.github.io/app-proyectos-tareas-mav/app.html
- **Repo:** https://github.com/vpremoldeados-ai/app-proyectos-tareas-mav (rama `main`)
- **Carpeta local:** `D:\Google Drive VPH\CLAUDE AI\APP PROYECTOS TAREAS MAV\mis-gestiones\`
  - Se edita `app.html`, se copia a `app-proyectos-tareas-mav/` y se hace commit + push
  - GitHub Pages tarda ~45-75 s en desplegar
- **Firebase:** proyecto `vpremoldeados-tareas` (plan Spark, gratis)

---

## 🔐 Seguridad (resuelto el 2026-08-03)

La base **estaba abierta al mundo**: se podía leer Y escribir sin credenciales
(verificado con `curl`). Ya está cerrada.

- **Authentication → Email/Password:** habilitado
- **Usuario:** `ingmarcelovassallo@gmail.com` (la contraseña la puso Marcelo, no está acá)
- **Reglas de la base:** `{"rules":{".read":"auth != null",".write":"auth != null"}}`
- La app tiene pantalla de login, sesión persistente y botón 🚪 para salir

> ⚠️ **Consecuencia para trabajar:** ya no se puede leer/escribir la base con `curl`
> ni desde el navegador interno. Para inspeccionar datos reales hay que usar el
> Chrome de Marcelo (MCP `claude-in-chrome`) con la sesión iniciada, y ejecutar JS
> en la pestaña de la app.

> ⚠️ **Nunca ingresar contraseñas en formularios.** Ese paso siempre lo hace Marcelo.

---

## 🏗️ Arquitectura

Una sola app: **`app.html`** (unifica lo que antes eran `index.html` + `proyectos.html`).
HTML + CSS + JS vanilla, sin build. Firebase Realtime DB v8.

### Dónde vive cada cosa

| Qué | Firebase | localStorage |
|---|---|---|
| Proyectos, sus tareas y el equipo | `/proyectos` | `vph_pm_v1` |
| Tareas personales | `/vpremoldeados/tareas` | `tasks` |
| Objetivos y metas | `/vpremoldeados/objetivos` | `objetivos` |
| Lista de compras | `/vpremoldeados/compras` | `shopping` |

### Modelo de datos

```javascript
// Proyecto
{ id, name, type:"empresa"|"personal", area, responsable, tasks:[Tarea] }

// Tarea de proyecto
{ id, title, state:"backlog"|"planificado"|"en-curso"|"revision"|"hecho",
  dueDate:"YYYY-MM-DD", responsable, ejecutor, urgency, importance, order, miDia }

// Tarea personal (lista suelta)
{ id, title, urgency:"urgent"|"normal", importance:"importante"|"no-importante",
  date, time, alertBefore, completed, ambito:"empresa"|"personal", area,
  state:"en-curso"|"backlog", enDia:bool, dayOrder:number,
  // si es espejo de una tarea de proyecto:
  origen:"proyectos", proyecto, proyectoId, proyectoTaskId }

// Equipo (dentro de /proyectos)
{ team: { responsables:[], operarios:[], telefonos:{nombre:"549..."} } }
```

### Trampas conocidas (no repetir estos errores)

- **Fechas:** parsear `dueDate` con `parseYMD()`, nunca `new Date("2026-07-27")`.
  En UTC-3 el constructor nativo devuelve el día anterior.
- **`/proyectos` se escucha con `.on('value')`, nunca `.once()`.** Con `.once()` una
  pestaña vieja abierta pisaba toda la base al guardar.
- **Argumentos string en atributos HTML:** usar `jsArg()`, no `JSON.stringify()` suelto
  (sus comillas dobles cortan el atributo).
- **Firebase descarta los campos `null`** al guardar. `migrate()` los repone.
- **Al refrescar con un modal abierto**, preservar `editingTaskId` / `editingTaskProjectId`:
  `openProjectDetail()` los limpia y el Guardar posterior creaba duplicados.
- **Al sacar algo de Mi Día**, cortar el vínculo de los dos lados (`desvincularDelProyecto`).

---

## 🖥️ Las 7 pestañas

1. **☀️ Mi Día** *(pantalla inicial)* — lista sin límite, ordenable arrastrando (⠿).
   Arriba, los objetivos con "Foco de hoy" que rota por día.
2. **🌅 Recorrida** — todo lo pendiente agrupado por Ámbito → Área. Filtro
   "En curso / Todo". Botón ☀️ +Mi Día en cada línea.
3. **📋 Tareas** — chips: Urgentes / Sin urgencia / Con fecha / Completadas
4. **🗂️ Proyectos** — tablero. Los botones de responsable muestran **sus tareas en curso**.
5. **🤝 Reuniones** — por persona, 3 vistas (Por proyecto / Tablero / Todo el equipo).
   Botón 📱 WhatsApp que arma el resumen.
6. **📆 Calendario**
7. **📈 Métricas** — incluye la Revisión Semanal

**En el encabezado:** 🎯 Objetivos · 🛒 Compras · 👥 Equipo · 🔔 Notificaciones · 🚪 Salir
**Botón flotante:** ➕ Nueva tarea

---

## 👥 Equipo

**Responsables** (a quién se le pide cuentas): Marcelo · Sofía · Gustavo
**Operarios** (quién ejecuta): Antonio (soldadura) · Darío (electricidad) · José (limpieza) · Matías · Demian · Ariel

Gustavo delega en los operarios. Sofía hace su trabajo administrativo ella misma.

**Reuniones fijas:** Gustavo Lun y Jue 11:00 · Sofía Lun y Jue 16:00

---

## 📊 Diagnóstico de gestión del tiempo (2026-08-03)

**El problema central:** Marcelo tenía **22 tareas en curso** contra 4 de Sofía y 4 de
Gustavo — 73% del trabajo activo sobre él. El cuello de botella de VPH no es la
producción, es él.

### Ya ejecutado: reasignación de 13 tareas

Quedó **Marcelo 9 · Sofía 14 · Gustavo 7**.

- **→ Sofía (10):** compras (nylon, cable TPR, tecla mesa vibradora, pantalón Darío,
  pico de loro, reintegros), marketing de ejecución, contador IERIC
- **→ Gustavo (3):** turno mecánico, mangueras 1/4, avance de Otto
- **Quedaron con Marcelo:** Omar/volteadora · Nuevo Molde LC60 · Google Ads ·
  cotizador web · Dashboard Finanzas VPH + 4 personales (ropa, vuelo)

### Criterio de delegación

- **Sofía:** administrativo, compras, proveedores, trámites, facturación, coordinación
- **Gustavo:** planta, máquinas, moldes, materiales, mantenimiento
- **Marcelo, solo si:** requiere decisión de dueño, plata grande, relación clave
  o diseño técnico que solo él sabe

### Reglas propuestas (aún no todas aplicadas)

1. **Máximo 3 en curso por persona.** No se empieza nada hasta cerrar algo.
2. **Máximo 5 proyectos activos** por trimestre (hoy hay 28).
3. Ritmo semanal anclado en las reuniones Lun/Jue.
4. La tarea grande del día, **antes de pisar la planta**.

---

## ⏳ Pendientes

### De datos (Marcelo)
- **~35 tareas sin área** — más de la mitad de la recorrida matutina
- Los **proyectos personales están todos bajo un área llamada "Marcelo"** —
  conviene repartirlos (Inglés → Formación, Pareja → Familia, Strada → Casa)
- **Solo 2 de 28 proyectos tienen responsable** cargado (las tareas sí lo tienen)
- **Sofía quedó con 14 en curso** — hay que priorizar con ella, no arrancar las 14
- Revisar dos reasignaciones dudosas: *"mangueras 1/4"* (¿Marcelo diseña, Gustavo
  ejecuta?) y *"Ver avance de Otto"* (¿relación con proveedor de Marcelo?)

### De la app (ideas, no comprometidas)
- Aviso de delegación también al **editar** una tarea, no solo al crearla
- Aviso al pasar a "En curso" cuando ya hay 3 (límite de WIP)
- Botón ✓ directo en la lista de reunión para marcar Hecha sin abrir modal
- Estado de proyecto **Activo / Congelado** para sostener el límite de 5

---

## 🎯 Objetivos personales de Marcelo (13, en la app)

Sonreír/saludar/elogiar · Meditar y agradecer · Yo puedo, depende de mí · Disfrutar ·
Estirar · Preguntar y conocer gente · Hablar inglés · Gimnasio 74 kg ·
Viajar 2 semanas cada 2 meses · Vender y automatizar · USD 10.000/mes ·
Vida social y familiar · Bien vestido

---

## 💬 Cómo trabaja Marcelo

- Responde muy corto ("todo", "si", "hacelo"). Cuando dice *"todo"* quiere la lista
  completa, no que se elija una opción.
- Prefiere que se tomen las decisiones de diseño con criterio y se le informen al
  final, antes que frenar la entrega para preguntar.
- Reservar las preguntas para bifurcaciones que cambien de fondo qué se construye.

### Reglas de oro del proyecto

1. Nunca eliminar datos sin respaldo ni sin confirmar
2. Verificar siempre contra datos reales antes de publicar
3. Sandbox obligatorio al probar: mockear `saveTasks` / `savePmData` para no escribir
4. Simplicidad: si algo puede ser más simple, simplificar
