# Estructura del Proyecto CodeMenu

## 📁 Árbol de Directorios

```
codemenu/
├── .claude/                      # Configuración de Claude Code
├── .next/                        # Build de Next.js (generado)
├── .vs/                          # Visual Studio config
├── node_modules/                 # Dependencias (generado)
│
├── public/                       # Archivos públicos estáticos
│   ├── icons/                    # Iconos de PWA
│   └── manifest.json             # Manifest de PWA
│
├── messages/                     # Traducciones i18n
│   ├── en.json                   # Inglés
│   └── es.json                   # Español
│
├── supabase/                     # Configuración de Supabase
│   └── seed.sql                  # SQL para crear tablas y datos de demo
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Rutas internacionalizadas
│   │   │   ├── (public)/         # Grupo de rutas públicas
│   │   │   │   ├── menu/
│   │   │   │   │   └── [category]/
│   │   │   │   │       └── page.tsx          # Página de productos por categoría
│   │   │   │   ├── layout.tsx                # Layout público (Header + Footer)
│   │   │   │   └── page.tsx                  # Página principal (categorías)
│   │   │   │
│   │   │   ├── (admin)/          # Grupo de rutas admin (protegidas)
│   │   │   │   └── admin/
│   │   │   │       ├── login/
│   │   │   │       │   └── page.tsx          # Login del admin
│   │   │   │       ├── dashboard/
│   │   │   │       │   ├── page.tsx          # Dashboard principal
│   │   │   │       │   ├── categories/       # (Por implementar)
│   │   │   │       │   └── products/         # (Por implementar)
│   │   │   │       └── layout.tsx            # Layout admin (Sidebar)
│   │   │   │
│   │   │   └── layout.tsx        # Layout con i18n y fuentes
│   │   │
│   │   ├── layout.tsx            # Root layout (metadata, viewport)
│   │   ├── globals.css           # Estilos globales + variables CSS
│   │   └── manifest.ts           # Configuración PWA manifest
│   │
│   ├── components/               # Componentes React
│   │   ├── ui/                   # Componentes base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── sonner.tsx        # Toast notifications
│   │   │   ├── cielo-logo.tsx    # Logo SVG de CIELO ⭐ NUEVO
│   │   │   ├── decorative-line.tsx   # Líneas decorativas ⭐ NUEVO
│   │   │   ├── section-title.tsx     # Títulos de sección ⭐ NUEVO
│   │   │   └── price-display.tsx     # Display de precios ⭐ NUEVO
│   │   │
│   │   ├── menu/                 # Componentes del menú público
│   │   │   ├── Header.tsx        # Header con logo y navegación ⭐ MEJORADO
│   │   │   ├── Footer.tsx        # Footer con redes sociales ⭐ MEJORADO
│   │   │   ├── LanguageSwitcher.tsx  # Selector ES/EN ⭐ MEJORADO
│   │   │   ├── CategoryCard.tsx  # Card de categoría ⭐ MEJORADO (con contador)
│   │   │   ├── ProductCard.tsx   # Card de producto ⭐ MEJORADO (responsive 2 col mobile)
│   │   │   ├── ProductModal.tsx  # Modal detalle producto ⭐ NUEVO
│   │   │   ├── ProductsGrid.tsx  # Grid con modal state ⭐ NUEVO
│   │   │   └── InstallPWA.tsx    # Botón instalar PWA
│   │   │
│   │   └── admin/                # Componentes del panel admin
│   │       ├── AdminSidebar.tsx  # Sidebar de navegación ⭐ MEJORADO
│   │       ├── CategoriesTable.tsx   # (Existente, por actualizar)
│   │       ├── CategoryDialog.tsx    # (Existente, por actualizar)
│   │       ├── DeleteDialog.tsx      # (Existente)
│   │       ├── ProductsTable.tsx     # (Existente, por actualizar)
│   │       └── ProductDialog.tsx     # (Existente, por actualizar)
│   │
│   ├── lib/                      # Utilidades y configuraciones
│   │   ├── supabase/             # Cliente de Supabase
│   │   │   ├── client.ts         # Cliente para componentes client
│   │   │   ├── server.ts         # Cliente para Server Components
│   │   │   ├── middleware.ts     # Middleware para auth
│   │   │   └── index.ts          # Exports
│   │   │
│   │   ├── i18n/                 # Configuración next-intl
│   │   │   ├── config.ts         # Locales disponibles
│   │   │   ├── navigation.ts     # Link/useRouter con i18n
│   │   │   └── request.ts        # Request config
│   │   │
│   │   ├── placeholder-images.ts # URLs de Unsplash por categoría ⭐ NUEVO
│   │   └── utils.ts              # Utilidades (cn, etc.)
│   │
│   ├── types/                    # Definiciones de tipos TypeScript
│   │   └── database.ts           # Tipos de Supabase (Category, Product)
│   │
│   └── middleware.ts             # Next.js middleware (i18n)
│
├── .env.local                    # Variables de entorno (NO commitear)
├── .gitignore                    # Archivos ignorados por Git
├── components.json               # Config shadcn/ui
├── next.config.ts                # Configuración Next.js
├── package.json                  # Dependencias y scripts
├── tailwind.config.ts            # Configuración Tailwind
├── tsconfig.json                 # Configuración TypeScript
├── CLAUDE.md                     # Instrucciones del proyecto
├── SUPABASE_SETUP.md             # Guía setup Supabase ⭐ NUEVO
└── PROJECT_STRUCTURE.md          # Este archivo ⭐ NUEVO
```

## 🎯 Flujo de la Aplicación

### Rutas Públicas (Sin autenticación)
```
/ (ES: /es, EN: /en)
  └── Muestra grid de categorías con contador de productos
  └── Hero section elegante
  └── Click en categoría → /menu/[category]

/menu/[category] (Ej: /menu/cocktails)
  └── Muestra grid de productos (2 col mobile, 3 tablet, 4 desktop)
  └── Click en producto → Abre ProductModal con detalles
  └── Imágenes placeholder de Unsplash
```

### Rutas Admin (Requiere autenticación)
```
/admin/login
  └── Form de login con Supabase Auth
  └── Redirecciona a /admin/dashboard si hay sesión

/admin/dashboard
  └── Cards de estadísticas
  └── Links a gestión de categorías/productos
  └── Sidebar con navegación

/admin/dashboard/categories (Por implementar)
  └── CRUD de categorías

/admin/dashboard/products (Por implementar)
  └── CRUD de productos con upload de imágenes
```

## 🎨 Sistema de Diseño

### Paleta de Colores (globals.css)
```css
/* Light Mode */
--primary: #0a0a0a          /* Negro profundo */
--secondary: #1a1a2e        /* Navy night */
--accent: #c9a227           /* Dorado elegante */
--background: #fafafa       /* Blanco hueso */

/* Dark Mode */
--background: #0f0f0f       /* Negro fondo */
--primary: #c9a227          /* Dorado (invertido) */
```

### Tipografía
- **Títulos:** Playfair Display (serif elegante)
- **Cuerpo:** Inter (sans-serif limpio)
- **Logo subtitle:** letra espaciada (tracking-wide-luxury)

### Animaciones
- `fade-in` - Entrada de elementos
- `shimmer` - Loading skeleton
- `float` - Flotación suave
- `transition-luxury` - Transición premium (.3s cubic-bezier)

### Clases Utilitarias Personalizadas
- `.text-gold`, `.bg-gold`, `.border-gold`
- `.tracking-wide-luxury` (letter-spacing: 0.3em)
- `.shadow-luxury`, `.shadow-luxury-lg`, `.shadow-gold`
- `.bg-gradient-luxury`, `.bg-gradient-dark-luxury`
- `.glass`, `.glass-dark` (glassmorphism)

## 📦 Dependencias Principales

### Core
- `next@16.0.10` - Framework React
- `react@19.2.1` - Biblioteca UI
- `typescript@5` - Lenguaje tipado

### UI & Styling
- `tailwindcss@4` - Estilos utility-first
- `@radix-ui/*` - Componentes accesibles (base de shadcn)
- `lucide-react` - Iconos
- `sonner` - Toast notifications
- `next-themes` - Dark mode

### Backend & Data
- `@supabase/supabase-js` - Cliente Supabase
- `@supabase/ssr` - SSR helpers

### i18n
- `next-intl` - Internacionalización

### PWA
- `next-pwa` - Progressive Web App

### Fuentes
- `@fontsource/playfair-display` - Serif elegante
- `@fontsource/inter` - Sans-serif (instalado pero usando Google Fonts)

## 🔑 Variables de Entorno

Archivo `.env.local` (crear en raíz):
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

## 📝 Scripts Disponibles

```bash
npm run dev        # Servidor desarrollo (localhost:3000)
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Linter ESLint
```

## 🗄️ Base de Datos (Supabase)

### Tablas
1. **categories**
   - id (UUID)
   - name_es, name_en (TEXT)
   - slug (TEXT UNIQUE)
   - sort_order (INT)
   - is_active (BOOLEAN)
   - created_at, updated_at (TIMESTAMPTZ)

2. **products**
   - id (UUID)
   - category_id (FK → categories)
   - name_es, name_en (TEXT)
   - description_es, description_en (TEXT)
   - price (DECIMAL)
   - price_alt (DECIMAL) - Precio alternativo (copa/botella)
   - price_alt_label (TEXT) - "Copa", "Jarra", etc.
   - image_url (TEXT)
   - is_active, is_featured (BOOLEAN)
   - sort_order (INT)
   - created_at, updated_at (TIMESTAMPTZ)

### Row Level Security (RLS)
- **Público:** Puede leer categorías y productos activos
- **Autenticado:** Acceso completo (admin)

## 🚀 Características Implementadas

### ✅ V1 (Completado)
- [x] Diseño premium con paleta CIELO
- [x] Header con logo SVG y scroll behavior
- [x] Footer elegante con redes sociales
- [x] Grid de categorías con contadores
- [x] Grid de productos responsive (2/3/4 col)
- [x] Imágenes placeholder de Unsplash
- [x] Modal de detalle de producto
- [x] i18n (ES/EN)
- [x] PWA básico
- [x] Login admin
- [x] Dashboard con estadísticas

### 🔄 V2 (En Progreso)
- [ ] CRUD de categorías (admin)
- [ ] CRUD de productos (admin)
- [ ] Upload de imágenes a Supabase Storage
- [ ] Dark mode toggle
- [ ] Loading skeletons
- [ ] Breadcrumb navigation
- [ ] PWA mejorado (splash screen, icons)

### 📋 Backlog
- [ ] Búsqueda de productos
- [ ] Filtros por categoría
- [ ] Productos destacados en home
- [ ] Ordenar productos (A-Z, precio)
- [ ] Drag & drop para orden de categorías
- [ ] Analytics de visitas
- [ ] Multi-restaurante (SaaS)

## 🎨 Mejoras de Diseño V2

1. **Grid 2 columnas en móvil** ✅
2. **Imágenes cuadradas con placeholder** ✅
3. **Modal de detalle** ✅
4. **Header mejorado con transiciones** ✅
5. **Sidebar admin oscuro con dorado** ✅
6. **Contador de productos por categoría** ✅

## 📖 Guías de Referencia

- **Setup Supabase:** Ver `SUPABASE_SETUP.md`
- **Instrucciones proyecto:** Ver `CLAUDE.md`
- **Documentación Next.js:** https://nextjs.org/docs
- **Documentación Supabase:** https://supabase.com/docs
- **shadcn/ui components:** https://ui.shadcn.com
