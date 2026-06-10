# 📤 CÓMO SUBIR LOS ARCHIVOS A GITHUB

## Opción 1: Drag & Drop (MÁS FÁCIL - sin terminal)

### Paso 1: Prepará los archivos
Tenés que descargar estos 4 archivos que te paso:
- `index.html` (App Tareas)
- `proyectos.html` (App Proyectos)
- `sw.js` (Service Worker)
- `README.md` (que ya creé)

Guardalos en una carpeta en tu PC (ej: `C:\descargaGitHub\`).

### Paso 2: Abrí tu repo en GitHub
1. Andá a https://github.com/vpremoldeados-ai/app-proyectos-tareas-mav
2. Clickeá el botón verde **"Code"** → **"Upload files"**
3. Arrastrá los 4 archivos a la zona gris (o clickeá para seleccionarlos)
4. Abajo, en **"Commit message"** escribí: `Initial commit: app tareas y proyectos`
5. Clickeá **"Commit changes"**

**¡Listo!** Los archivos se suben automáticamente.

---

## Opción 2: Desde Git (si querés aprender terminal)

Si tenés Git instalado en tu PC:

```bash
# 1. Cloná el repo
git clone https://github.com/vpremoldeados-ai/app-proyectos-tareas-mav.git
cd app-proyectos-tareas-mav

# 2. Copiá los 4 archivos a esta carpeta:
# index.html, proyectos.html, sw.js, README.md

# 3. Agregá y subí
git add .
git commit -m "Initial commit: app tareas y proyectos"
git push

# ¡Listo!
```

---

## Después de subir: Activar GitHub Pages

1. En GitHub, andá a tu repo
2. **Settings** (arriba a la derecha)
3. En el menú izquierdo, clickeá **"Pages"**
4. **Source:** seleccioná **"Deploy from a branch"**
5. **Branch:** seleccioná `main` y `/root`
6. Clickeá **"Save"**
7. Espera ~3 minutos

**Tu app estará en:** https://vpremoldeados-ai.github.io/app-proyectos-tareas-mav/

---

## ✅ Después: Cómo actualizar la app

Cada vez que hay cambios:

1. **Descargás** el archivo nuevo de Claude
2. **Reemplazás** en tu carpeta local
3. **Subo a GitHub** (drag & drop o git push)
4. **En 1-2 minutos** aparece el cambio en el link publicado

Los datos (tareas, proyectos) **quedan guardados en tu navegador**, así que no se pierden al actualizar la app.

---

**¿Necesitás ayuda para subir los archivos?**
