# Configuración de Iconos PWA para CIELO Rooftop Bar

## Iconos Necesarios

Debes crear los siguientes iconos y colocarlos en la carpeta `public/icons/`:

### Iconos PWA Estándar
- `icon-72x72.png` (72x72px)
- `icon-96x96.png` (96x96px)
- `icon-128x128.png` (128x128px)
- `icon-144x144.png` (144x144px)
- `icon-152x152.png` (152x152px)
- `icon-192x192.png` (192x192px)
- `icon-384x384.png` (384x384px)
- `icon-512x512.png` (512x512px)

### Iconos Maskable (para Android)
- `icon-192x192-maskable.png` (192x192px)
- `icon-512x512-maskable.png` (512x512px)

### Icono Apple Touch
- `apple-touch-icon.png` (180x180px)

## Diseño Recomendado

**Colores de Marca CIELO:**
- Fondo: `#0a0a0a` (negro profundo)
- Logo/Acento: `#c9a227` (dorado elegante)
- Opcional: `#1a1a2e` (navy night) para variaciones

**Estilo:**
1. Fondo negro (#0a0a0a)
2. Logo CIELO en dorado (#c9a227)
3. Puede incluir un círculo dorado decorativo
4. Tipografía: Serif elegante para "CIELO"
5. Subtexto opcional: "ROOFTOP BAR" en letras pequeñas

## Herramientas para Generar Iconos

### Opción 1: Generador Online
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io/)

Sube una imagen cuadrada de 1024x1024px y descarga todos los tamaños automáticamente.

### Opción 2: Figma/Photoshop
1. Crea un artboard de 1024x1024px
2. Diseña el icono con los colores de CIELO
3. Exporta a todos los tamaños necesarios

### Opción 3: Generador CLI
```bash
npm install -g pwa-asset-generator

# Genera todos los iconos desde una imagen source
pwa-asset-generator source-icon.png public/icons \
  --background "#0a0a0a" \
  --icon-only \
  --favicon \
  --padding "10%"
```

## Iconos Maskable

Los iconos maskable deben tener un "safe zone" para Android:
- Contenido importante: círculo central del 80%
- Área de margen: 20% exterior puede ser recortado

## Screenshots para PWA (opcional)

Si quieres agregar screenshots para la instalación de PWA:

```
public/screenshots/
├── screenshot1.png (540x720px - móvil vertical)
└── screenshot2.png (1280x720px - desktop horizontal)
```

Capturas recomendadas:
1. Página principal con categorías
2. Vista de productos de una categoría
3. Modal de producto destacado

## Verificación

Después de agregar los iconos:

1. **Build la aplicación:**
   ```bash
   npm run build
   npm start
   ```

2. **Verifica el manifest:**
   - Abre: `http://localhost:3000/manifest.webmanifest`
   - Debe mostrar el JSON del manifest

3. **Prueba en móvil:**
   - Abre en Chrome (Android) o Safari (iOS)
   - Menú > "Agregar a pantalla de inicio"
   - Verifica que el icono se vea correctamente

4. **Lighthouse PWA Audit:**
   ```bash
   npm run build
   npm start
   # Luego abre DevTools > Lighthouse > Progressive Web App
   ```

## Estructura Final

```
public/
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   ├── icon-192x192-maskable.png
│   ├── icon-512x512-maskable.png
│   └── apple-touch-icon.png
└── screenshots/ (opcional)
    ├── screenshot1.png
    └── screenshot2.png
```

## Notas Adicionales

- Los iconos deben ser **cuadrados** (1:1 ratio)
- Formato: **PNG** con fondo sólido
- Para iconos maskable, usa un margen del 10-20%
- El manifest ya está configurado en `src/app/manifest.ts`
- El metadata en `src/app/layout.tsx` ya referencia los iconos

Una vez agregados los iconos, la PWA estará completa y lista para instalarse en dispositivos móviles.
