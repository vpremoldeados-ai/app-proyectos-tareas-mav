# 📍 ESTADO ACTUAL — App Mis Gestiones (VPH)

> Punto de partida para una sesión nueva. Última actualización: 2026-10-10.

---

## 🔗 Accesos

- **App en producción:** https://vpremoldeados-tareas.web.app  ← la principal
  Firebase Hosting, en el mismo proyecto que la base. Se publica con
  `npx firebase-tools deploy --only hosting` desde `mis-gestiones/` (la carpeta
  `hosting/` lleva una copia de app.html como `index.html`, más sw.js, manifest e
  iconos). Los HTML van sin caché: el cambio se ve al refrescar.
- **Espejo:** https://vpremoldeados-ai.github.io/app-proyectos-tareas-mav/app.html
  GitHub Pages. El 2026-10-05 su cola quedó trabada varias horas (el build
  compilaba bien y el paso de publicar se cancelaba), y por eso se montó Firebase
  Hosting. Conviene publicar en los dos.
- **Repo:** https://github.com/vpremoldeados-ai/app-proyectos-tareas-mav (rama `main`)
- **Carpeta local:** `D:\Google Drive VPH\CLAUDE AI\APP PROYECTOS TAREAS MAV\mis-gestiones\`
  - Se edita `app.html`, se copia a `app-proyectos-tareas-mav/` y se hace commit + push
  - GitHub Pages tarda ~45-75 s en desplegar
- **Firebase:** proyecto `vpremoldeados-tareas` (plan Spark, gratis)

---

## 🔐 Seguridad (cerrada el 2026-08-03, endurecida el 2026-09-01)

La base **estaba abierta al mundo**: se podía leer Y escribir sin credenciales
(verificado con `curl`). Ya está cerrada.

- **Authentication → Email/Password:** habilitado
- **Usuario:** `ingmarcelovassallo@gmail.com` (la contraseña la puso Marcelo, no está acá).
  La pantalla de login tiene **¿Olvidaste tu contraseña?**: manda el mail de
  recuperación y no hace falta entrar a la consola. El aviso no dice si el correo
  existe, para no exponer la lista de usuarios.
- **Dueño del proyecto Firebase:** `vpremoldeados@gmail.com` (cuenta de la empresa).
  `ingmarcelovassallo@gmail.com` quedó como **Editor**, que es con la que se despliega.
- **Reglas de la base:** solo el UID de Marcelo `nvBqStXww4a3GcMHNvYHHayv7ph2`
  puede leer y escribir:
  ```json
  {"rules":{".read":"auth != null && auth.uid === 'nvBqStXww4a3GcMHNvYHHayv7ph2'",
            ".write":"auth != null && auth.uid === 'nvBqStXww4a3GcMHNvYHHayv7ph2'"}}
  ```
- **Registro de usuarios DESACTIVADO** (Authentication → Configuración → Acciones del
  usuario → "Habilitar la creación" y "Habilitar la eliminación", las dos apagadas). Antes cualquiera con el `apiKey` que está en el
  HTML podía crearse una cuenta solo y, con las reglas viejas (`auth != null`), entrar
  a toda la base. Corregido el 2026-09-01 tras el aviso de Firebase por reglas inseguras.
- Para sumar a Sofía o Gustavo: crear el usuario a mano en Authentication y agregar su
  UID a las reglas (o pasar a una lista `/usuarios/$uid` guardada en la base)
- La app tiene pantalla de login, sesión persistente y botón 🚪 para salir

> ⚠️ **Consecuencia para trabajar:** ya no se puede leer/escribir la base con `curl`
> ni desde el navegador interno. Para inspeccionar datos reales hay que usar el
> Chrome de Marcelo (MCP `claude-in-chrome`) con la sesión iniciada, y ejecutar JS
> en la pestaña de la app.

> ⚠️ **Nunca ingresar contraseñas en formularios.** Ese paso siempre lo hace Marcelo.

---
## 🧹 Limpieza del 2026-10-05

Revisión completa de los datos y primera tanda de orden. Respaldos previos en
Firebase: `respaldos/2026-10-05_antes_de_cerrar_proyectos` y `..._antes_de_limpieza`.

**Diagnóstico:** la última tarea cerrada era del 11 de agosto — casi dos meses
cargando sin cerrar nada. La reasignación de agosto se deshizo sola: Marcelo volvió
a tener 45 de 61 tareas de proyecto pendientes (74%) contra 5 de Sofía y 2 de Gustavo.

**Hecho:**

- Estado de proyecto **Activo / Congelado / Cerrado** (lo que faltaba desde agosto).
  Los no activos salen del tablero, la Recorrida, Reuniones y el selector de tareas,
  pero quedan enteros. `allPmTasks()` los excluye salvo que se le pase `true`.
- **4 proyectos terminados cerrados:** Mantenimiento Mulita · Camión distribuidor sin
  grúa · Mesa vibradora · Mejoras en Tablero VPH. Quedaron 25 activos de 29.
- **10 tareas sacadas del área Compras**, que era el cajón de sastre (19 tareas, la
  mitad no eran compras). Quedan 9 reales.
- **Los 7 proyectos personales dejaron el área "Marcelo"**: Casa (Livette, Strada, 13b),
  Familia (Pareja), Formación (Inglés), Finanzas personales, Compras personales.
- **Mi Día pasó de 16 tareas a 3.** Las otras 13 no se borraron: volvieron a Tareas.
- Caja **"🎯 Para hoy"** arriba de Mi Día: se arma sola al abrir con la reunión del día,
  lo vencido, una tarea de foco y los avisos de sistema (WIP, proyectos sin cerrar).

### Segunda tanda: la bandeja 📥 Para revisar

Respaldo previo: `respaldos/2026-10-05_antes_de_la_bandeja`.

En vez de congelar 13 proyectos, Marcelo pidió juntar todo lo indefinido en un solo
lugar para triarlo después. El viejo proyecto "Tareas sueltas" pasó a llamarse
**📥 Para revisar** y recibió 80 tareas:

- **29** de los 9 proyectos que se vaciaron y cerraron (Auditoría de procesos, Videos
  para redes, Google Ads, Nuevo Molde LC60, Superfluidificante, Livette, Strada, 13b,
  Vestimenta). Lo ya hecho quedó en el proyecto original.
- **50** de la lista suelta. Quedaron afuera las 2 elegidas para hoy.

Cada tarea lleva en el título de dónde vino (`— [proyecto]` o `— [suelta · área]`) y
los campos `origenProyecto` / `origenSuelta` / `origenArea` / `origenAmbito` /
`origenHora` / `origenAviso` para poder devolverla a su lugar.

**Todas quedaron en `backlog`:** nada de la bandeja está "en curso", porque justamente
es lo que falta decidir. Si no, el contador de WIP marcaba 80.

**La bandeja lleva `bandeja: true`** y por eso `allPmTasks()` y `proyectosActivos()` la
ignoran: no genera alertas de vencidas, no entra en la Recorrida ni en Reuniones. Se ve
solo en el tablero de Proyectos.

**Quedaron 15 proyectos activos + la bandeja.** De los 29 originales, 13 cerrados.

> ⚠️ El Kanban con 80 tarjetas pone lenta la pantalla. Conviene vaciar la bandeja en
> varias sentadas, no de una.

### Bandeja vaciada (mismo día)

Las 80 se repartieron en seis tandas: compras, marketing, producción, ventas, lo
personal y el resto. Respaldo antes de cada una (`respaldos/2026-10-05_antes_de_*`).

Proyectos que se crearon o cambiaron de nombre:

| Antes | Ahora | Por qué |
|---|---|---|
| Videos para redes (2 por semana) | **Contenido y redes** (Sofía) | el nombre prometía una frecuencia que nunca se cumplió |
| Vender Losetas con fibra | **Nuevos clientes y muestras** (Marcelo) | ya era prospección con muestras, no un producto |
| Cambiar Strada | **Vehículos** | se llevó también la Hilux |
| — | **Taller — pendientes de planta** (Gustavo) | los mandados sueltos de planta no tenían dónde vivir |
| — | **Transporte y entregas** (Sofía) | |
| — | **Salud**, **Compras personales**, **Equipo y RRHH** | |
| Nuevo Molde LC60 | *(fusionado en Máquina LC60)* | era la misma máquina |

**Estado final:** 24 proyectos activos · 2 congelados (Google Ads, Livette) · 7 cerrados.
La bandeja queda vacía y sirve de ahora en más como bandeja de entrada.

**Carga:** Marcelo 60 · sin asignar 26 · Sofía 9 · Gustavo 6. Repartir sigue pendiente.

**Posibles duplicadas marcadas, no borradas:**
- "Pagar a Omar" vs "Transferir adelanto Omar" (ambas en Máquina LC60)
- "Aceite reutilizado barato" + "Aceitera Bernal…" vs "Conseguir aceite barato
  desmoldante" (las tres en Rociador Gasoil)
- Citas de Salud con fecha ya pasada (odontólogo agosto, nariz septiembre)

**Clasificadas por suposición, confirmar:** "Vida Cowork" y "Hablar a Claudio Gómez
MEGA Containers" fueron a Compras · "Radio" a Compras · "Llevar muestra a Q2 de GR" a
Nuevos clientes.

**Pendiente de decisión de Marcelo:**

- **Congelar en serio:** quedaron 24 proyectos activos. El objetivo eran 5.
- Repartir en serio: hoy Gustavo tiene 2 tareas y Sofía 5.
- Dos tareas sin clasificar bien: *"Vida Cowork"* y *"Hablar a Claudio Gómez MEGA
  Containers"* — quedaron en Compras porque no está claro qué son.
- Que las reuniones de Mar/Vie se hagan con la app abierta, o lo delegado no vuelve.

---
## 🔧 Arreglos del 7 de octubre de 2026

Todos desplegados en Firebase Hosting (sw `mis-gestiones-v10`).

1. **La pantalla no se refrescaba al guardar.** `savePmData()` dejaba `fbLoading` en
   true mientras escribía, el listener se salteaba el eco y nadie redibujaba. Ahora
   llama a `pmRefresh()` en el `.finally`.
2. **`pmRefresh()` no redibujaba Mi Día.** Faltaba la rama `tab-dia → renderDayPlan()`.
3. **La raíz del sitio se cacheaba una hora.** La regla `**/*.html` de `firebase.json`
   no alcanzaba a `/`. Se agregó una regla propia para `/` con `no-cache`.
4. **Editar una tarea no actualizaba su espejo en Mi Día.** Nuevas `sincronizarEspejo()`
   y `borrarEspejo()`, llamadas desde `pmSaveTask()` y `pmDeleteTask()`.
5. **La racha de hábitos se mostraba recién al segundo día** (`racha > 1`). Ahora desde
   el primero. Los hábitos funcionaban bien: Marcelo nunca los había marcado.
6. **Arrastre automático** (ver abajo).

Quedan **5 espejos huérfanos** en `vpremoldeados/tareas` sin tarea de proyecto detrás;
no están en Mi Día y Marcelo todavía no dijo si limpiarlos.

---

## 🍽️ Alimentación (2026-10-10)

Módulo para su plan de composición corporal (bajar cintura sin perder músculo; nutricionista
Pauli Achimón). Botón 🍽️ en el encabezado del celular, "Comidas" en la barra de abajo,
"Alimentación" en la barra lateral, y tarjeta en Mi Día con la proteína del día.

Datos en vpremoldeados/nutricion (localStorage nutricion):
{ objetivos:{protMin:130, protMax:140, kcalMin:1900, kcalMax:2200}, recetas:[{id, emoji, nombre,
  tipo:desayuno|principal|colacion, porciones, tanda, porcion:{kcal,prot,carb,gras}, ingredientes[],
  pasos[], porque, base}], plan:[{titulo, items[]}], registro:[{id, fecha, comida:desayuno|almuerzo|
  merienda|cena, nombre, kcal, prot, recetaId?, porciones?, origen?, nota?}],
  ingredientes:[{k:"u…", n, g:prot|carb|verd}] }   ← los que agrega él en Cocinar

- Tres vistas: Hoy (totales contra objetivos, comidas por momento, anotar a mano o desde receta,
  "Contale a Claude"), Recetas (filtros, detalle, anotar porciones) y Mi plan (pautas + objetivos editables).
- 14 recetas base (r01–r14) calculadas con una tabla de referencia y sus etiquetas (whey Body
  Advance 40 g = 140 kcal / 24 g; atún 60 g = 64 kcal / 15 g; su leche 1,5 g de proteína por 100 ml).
  El cálculo está en el script de la sesión del 10/10; los valores quedaron guardados en la base.
- La referencia de 1.900–2.200 kcal es una estimación nuestra, a confirmar con Pauli (su documento
  dice que todavía no hay objetivo calórico definido).
- Conector: ver_alimentacion, registrar_comida, borrar_comida, ver_recetas, agregar_receta (20 herramientas).
- Se cargaron también al gimnasio las sesiones del 8/10 y 9/10 de su documento (press plano 5 kg y
  jalón 30 kg como pesos actuales).
- **Cocinar ("¿Qué cocino con lo que tengo?")**, cuarta vista. Se llega desde la pestaña Cocinar, el botón
  en Hoy o el atajo en ✨ Claude. Se marcan ingredientes en chips (proteínas, carbohidratos, verduras) más
  un campo "Otros". La app muestra al instante cuáles de sus recetas salen: tiene que tener todas las
  proteínas y carbohidratos, o con un cambio como mucho (arroz↔fideos↔papa↔batata, salvo el carbohidrato
  base del plato; pollo↔carne↔cerdo). Pueden faltar verduras, y acelga↔espinaca no cuenta como cambio. Aceite, sal y condimentos se dan por
  sentados. El botón arma el pedido para Claude (ingredientes, proteína y kcal del día, recetas que
  sirven) y le pide no anotar nada hasta que diga qué comió. Lo marcado se guarda solo en ese
  navegador (localStorage nutCocina), no en la base. Con "+ Agregar" en cada grupo suma ingredientes propios a la
  lista (van a la base, nut.ingredientes); en ese modo tocando ✕ los saca. Si escribe uno que ya está
  ("rúcula", "morrones") lo marca en vez de duplicarlo. Se buscan en las recetas por nombre sin la ese final. Las instrucciones del conector también explican
  cómo responder "qué cocino".

---

## 📱 Diseño iOS (2026-10-10)

**Color (10/10, elegido por Marcelo entre cuatro): Azul iPhone.** Acento #007AFF (#0A84FF en
oscuro), sin violeta ni degradés en ningún lado; "Para hoy" es una tarjeta celeste plana
(--sug-fondo / --sug-texto); el estado "En revisión" pasó a turquesa. Ícono nuevo azul plano con
"MG" (los violetas quedaron en _respaldo/iconos_violeta). No le gusta el violeta.

Marcelo usa la app sobre todo en un iPhone 17 Pro. Capa de estilos al final del <style>
("DISEÑO iOS"): paleta y letra del sistema (SF Pro, sin Google Fonts), modo oscuro
automático con las variables redefinidas en prefers-color-scheme: dark.

- **Celular (≤768 px):** barra de abajo (#tabBar) con TODAS las secciones (Mi Día, Recorrida,
  Tareas, Proyectos, Reuniones, Calendario, Métricas) y herramientas (Claude, Compras, Gimnasio,
  Objetivos, Equipo, Avisos, Salir); se desliza de costado, la activa se centra y un degradé
  (clases hay-izq / hay-der, función sombrasBarra) avisa que hay más. Ya no existe la hoja "Más".
  Título grande con la fecha, ventanas como hojas que suben desde abajo, botón + redondo.
  🎯 👥 🔔 🚪 del encabezado quedan solo en escritorio (clase solo-escritorio). Las tarjetas
  de resumen (cuadrantes y compras) no se muestran en el celular.
- **Computadora (≥769 px):** barra lateral fija estilo Mac (#lateral) con todas las secciones y
  herramientas, contadores (Mi Día pendientes, Tareas sueltas pendientes, Proyectos vencidas en rojo,
  función pintarContadores), título grande y botón "+ Nueva tarea" arriba a la derecha (sin botón
  flotante). Mi Día en dos columnas: .dia-lista a la izquierda y .dia-lado (Para hoy, gimnasio,
  objetivos) a la derecha; entre 769 y 1100 px vuelve a una columna. Los números de cuadrantes
  se ven solo en Tareas (clase en-tab-tareas en el body). Las pestañas de arriba ya no se usan.
  El menú se oculta con el botón junto al título o Ctrl+B (clase lateral-oculta, guardada en
  localStorage vph_lateral_oculta).
- Respaldo antes de la barra lateral: _respaldo/app_2026-10-10_antes_diseno_pc.html
- marcarPestania(id) sincroniza las dos barras y el título; goTab y showPmOnlyTab la llaman.
- Los campos van a 16 px en el celular: con menos, iOS agranda la pantalla al tocarlos.
- Respaldo del HTML anterior: _respaldo/app_2026-10-10_antes_diseno_ios.html

---

## 🔌 Conector de Claude (MCP) — publicado (2026-10-10)

Para que Marcelo maneje la app desde Claude (celular, web, escritorio) sin depender de
esta compu ni de Chrome. Es un conector MCP remoto con OAuth.

- **Dirección para agregarlo en Claude:** https://mis-gestiones-mcp.vpremoldeados.workers.dev/mcp
- **Dónde corre:** Cloudflare Workers (cuenta de vpremoldeados@gmail.com), plan gratis sin tarjeta (Marcelo no quiso pasar
  Firebase a Blaze). Worker `mis-gestiones-mcp`; dirección y KV en `conector/wrangler.jsonc`.
- **Herramientas:** 20 (tareas y Mi Día, proyectos, compras, gimnasio, alimentación).
- **Código:** `conector/` (`worker.js` = rutas y OAuth con `@cloudflare/workers-oauth-provider`;
  `almacen.js` = base por REST; `datos.js` = reglas de la app copiadas; `herramientas.js` = las
  15 herramientas e instrucciones para Claude; `login.js` = página de conexión;
  `prueba/prueba.js` = prueba de punta a punta con `wrangler dev` contra un Firebase falso, 16 pasos).
- **Publicar:** `bash conector/publicar.sh` (copia a `~/vph-conector/w`, fuera de Drive, instala,
  prueba y despliega). Con `--solo-probar` no publica.
- **Cómo entra a la base:** sin clave de administrador. Al conectarse, Marcelo entra con su
  usuario de la app; el conector guarda su refresh token de Firebase en `props` (cifrado con el
  token de Claude) y con él pide tokens de identidad para la API REST. Lo frenan las mismas
  reglas de la base. Si Marcelo cambia la contraseña, hay que reconectar.
- **Botón ✨ Preguntarle a Claude** en la app (encabezado del celular, hoja Más y barra lateral):
  hoja con pedidos rápidos y texto libre; abre https://claude.ai/new?q=… con "Usá el conector Mis
  Gestiones." adelante y además copia el pedido, porque ?q= no está documentado oficialmente.
- **Escrituras:** transacción por REST (ETag + `if-match`, reintenta si la app guardó en el medio).
- **Seguridad:** Claude se registra solo (DCR) pero solo se aceptan retornos a claude.ai /
  claude.com / localhost; solo pasa el UID de Marcelo. Acceso 1 h, renovación 90 días sin uso.
- **No borra tareas.** Completar una suelta la deja tildada (la app, desde Mi Día, la borra).
- Si cambia cómo app.html guarda algo (espejos, recurrentes, gimnasio), hay que cambiar
  `datos.js` también. La lista de nombres de alternativas del gimnasio está duplicada ahí.

---

## 🏋️ Gimnasio (2026-10-10)

Botón 🏋️ en el encabezado. Datos en `vpremoldeados/gimnasio` (localStorage `gimnasio`):

```javascript
{ rutinas:  [{ id, nombre, dias:[0-6], ejercicios:[{ id, nombre, series, reps, peso }] }],
  sesiones: [{ id, fecha:"YYYY-MM-DD", rutinaId, rutina, hechos:[ejId], pesos:{ "e<ejId>": kg } }],
  peso:     [{ fecha, kg }] }
```

- Se tilda cada ejercicio hecho y se anota el peso; ese peso queda como el de la próxima vez y al lado se ve el de la vez pasada.
- Las rutinas con días cargados aparecen arriba de **Mi Día** (`gymHoyHTML()`). Sin días, se sugiere la que sigue a la última (A → B → C).
- Peso corporal contra la meta de 74 kg (`GYM_META_KG`), cintura en cm (`gym.cintura: [{fecha, cm}]`) contra la meta de 86 cm (`GYM_META_CINTURA`; primero 90, el 10/10 Marcelo la pasó a 86, la de su plan) y contra la primera medida y registro de las últimas idas.
- Las claves de `pesos` llevan prefijo `e` para que Firebase no las convierta en array.
- **Cargada su rutina Día 1** (8 ejercicios, todos los días desde el 10/10 a pedido de Marcelo; antes Lun y Jue). La Hack Slide está en pausa (`pausado`) por molestia en la rodilla: se ve pero no cuenta.
- Cada ejercicio tiene `nota`, `pausado`, `descanso` (segundos, 90 por defecto) y `guia`. La rutina tiene `notas` (las pautas).
- **Series y descanso:** tocar el número de una serie la marca y arranca la cuenta regresiva (pitidos, vibración, pantalla encendida). Completar todas deja el ejercicio hecho. La sesión guarda `series`, `pesos` y `reps`.
- **Alternativas** (2026-10-10): 27 ejercicios más en `GYM_GUIAS`, con `grupo` (pecho, dorsales, espalda, hombros, piernas, isquios, abdomen, cardio) y `equipo`. El botón 🔄 de cada fila abre el selector por grupo: **Usar hoy** guarda `sesion.cambios["e<id>"] = clave` (solo ese día); **📌 Dejarlo fijo** reemplaza el ejercicio en la rutina con id nuevo. Cada alternativa recuerda su peso en `gym.pesosAlt[clave]` y su historial como `pesos["a_<clave>"]`. Un ejercicio en pausa cambiado por otro cuenta ese día. Marcelo repite el Día 1 en todas las sesiones por ahora (no hay Día 2).
- **Guías** (`GYM_GUIAS`): tocar el nombre muestra fotos de inicio y final, un mapa del cuerpo con los músculos y los pasos de técnica. Las fotos son de free-exercise-db (dominio público), copiadas en `hosting/gym/` y en el repo espejo. Para un ejercicio nuevo hay que sumar su guía y bajar sus fotos.

---

## ⏭️ Arrastre automático (2026-10-07)

Al abrir la app, `arrastrarPendientes()` pasa al día de hoy toda tarea **de Marcelo**
vencida y sin hacer, y le suma 1 a `arrastres`. Mi Día muestra "⏭️ arrastrada N veces",
para que correr la fecha no esconda el atraso.

**No arrastra** las de Gustavo ni Sofía: esas conservan su fecha porque el atraso es
justamente lo que se mira en la reunión. Tampoco las recurrentes, que ya calculan su
próxima fecha solas.

---

## 🔁 Tareas que se repiten (2026-10-06)

Una rutina no es una tarea con fecha: es algo que vuelve. En el modal de tarea de
proyecto hay una fila de días (`Lun Mar Mié…`) que guarda `t.repetir = {dias:[0-6]}`,
con 0 = domingo.

- `cargarRecurrentesDeHoy()` corre al abrir la app y al llegar datos de Firebase:
  mete en **Mi Día** las recurrentes **de Marcelo** que tocan hoy (las de Gustavo y
  Sofía no entran: Mi Día es personal).
- Al marcarla hecha desde Mi Día, `cumplirRecurrente()` no la cierra: anota `hechaEl`,
  suma `vueltas` y mueve `dueDate` al próximo día que toca.
- El espejo completado queda como registro; `espejoVivo()` ignora los completados.

Activas hoy: *Publicar 2 reels* (martes y viernes, Marcelo) y *Números de la semana al
equipo* (viernes, Gustavo). Las rutinas de stock y mantenimiento quedaron **sin
repetición** hasta acordar la frecuencia con Gustavo.

---

## 🗓️ Rituales y proyectos nuevos (2026-10-06)

- **Rutinas de planta** (Gustavo): stock y pedido de compra, mantenimiento y limpieza,
  números de la semana, mantenimiento de la cortadora, repaso de ropa y EPP.
- **Mejoras en producción** (Gustavo): activar el sistema de riego para el curado y
  revisar si está hecho el sistema de riego exterior. **Son dos tareas distintas**,
  confirmado por Marcelo el 6/10: no unificarlas.
- **Capacitación del equipo** (Marcelo): cuatro guías escritas en `capacitacion/` —
  cronometrar y 5S para Gustavo, producto y seguimiento de presupuestos para Sofía.
  *La de producto tiene huecos que solo puede llenar Marcelo: precio por m², si
  soporta camión, flete.*
- **Teléfonos cargados** en `pmData.team.telefonos`, así el botón 📱 de Reuniones arma
  el WhatsApp de cada uno. Gustavo y Sofía **no tienen acceso a la app**: ese resumen
  es el único puente hacia ellos.

La skill `reunion` tiene una sección **Puntos fijos con Gustavo** que se preguntan
siempre, estén vencidos o no: los dos riegos, el repaso de stock, el día de
mantenimiento y limpieza, y qué le parece prioritario a él.

**Objetivos por persona:** Gustavo → eficiencia en producción · Sofía → más ventas.
Los dos indicadores que se habían creado (kilos por jornada, cotizaciones por semana)
los eliminó Marcelo el mismo día; queda *Números de la semana* como única métrica.

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
| Gimnasio | `/vpremoldeados/gimnasio` | `gimnasio` |

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

- **Mi Día NO se dibuja desde `pmData`.** `renderDayPlan()` lee `tareasDelDia()`, que
  filtra `tasks` (nodo `vpremoldeados/tareas`) por `enDia`. Una tarea de proyecto llega
  a Mi Día a través de un **espejo** en `tasks` con `proyectoTaskId`. Cambiar `miDia` en
  `pmData` no mueve nada en pantalla: hay que tocar el espejo y hacer `saveTasks()`.
  Si se borra o renombra una tarea de proyecto, su espejo queda huérfano (pasó el 6/10).

- **Dos banderas distintas para Mi Día.** Las tareas de proyecto usan `miDia`; las
  tareas sueltas de `vpremoldeados/tareas` usan `enDia`. Buscar solo una deja la mitad
  del día afuera (pasó el 6/10).
- **Mi Día es solo de Marcelo.** Una tarea de Gustavo o Sofía marcada en Mi Día no la
  hace nadie: ellos no usan la app. Va a su proyecto y se habla en la reunión.

- **La base NO cuelga de `pm`.** `savePmData()` escribe en `db.ref('proyectos')`.
  Un respaldo hecho desde `pm` guarda **null** y no sirve de nada (pasó el 6/10).
  Verificar siempre con `firebase.database().ref().once('value')` antes de confiar en
  un respaldo. Nodos reales: `proyectos`, `vph_pm_v1` (viejo), `vpremoldeados`, `respaldos`.

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

**Reuniones fijas:** Gustavo Mar y Vie 11:00 · Sofía Mar y Vie 15:30

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

- **Sofía:** administrativo, proveedores, trámites, facturación, coordinación
- **Gustavo:** planta, máquinas, moldes, mantenimiento, trabajo de taller
- **Marcelo:** decisión de dueño, plata grande, relación clave, diseño técnico — **y
  todas las compras**, que las hace él (confirmado el 2026-10-06)

### Reglas propuestas (aún no todas aplicadas)

1. **Máximo 3 en curso por persona.** No se empieza nada hasta cerrar algo.
2. **Máximo 5 proyectos activos** por trimestre (hoy hay 28).
3. Ritmo semanal anclado en las reuniones Mar/Vie.
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
