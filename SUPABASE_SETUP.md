# Configuración de Supabase para CodeMenu

## 1. Crear Proyecto en Supabase

1. Ve a https://supabase.com
2. Crea una cuenta o inicia sesión
3. Click en "New Project"
4. Completa:
   - **Name:** CodeMenu (o el nombre que prefieras)
   - **Database Password:** (guárdala, la necesitarás)
   - **Region:** Elige la más cercana a tu ubicación
   - **Pricing Plan:** Free tier está bien para desarrollo
5. Click "Create new project" (tarda ~2 minutos)

## 2. Obtener Credenciales (Variables de Entorno)

Una vez creado el proyecto:

1. Ve a **Settings** (ícono de engranaje) → **API**
2. Copia estos valores:

```env
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co

# anon/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# service_role key (solo para operaciones de servidor)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Crea/actualiza el archivo `.env.local` en la raíz del proyecto con estos valores

## 3. Crear las Tablas (Base de Datos)

### Opción A: Usar el archivo seed.sql

1. Ve a **SQL Editor** en el panel de Supabase
2. Abre el archivo `supabase/seed.sql` de este proyecto
3. Copia todo el contenido
4. Pégalo en el SQL Editor
5. Click en "Run" para ejecutar

### Opción B: Ejecutar manualmente las tablas

En **SQL Editor**, ejecuta este SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  price_alt DECIMAL(10,2),
  price_alt_label TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Políticas: Lectura pública para categorías activas
CREATE POLICY "Public read active categories"
  ON categories
  FOR SELECT
  USING (is_active = true);

-- Políticas: Lectura pública para productos activos
CREATE POLICY "Public read active products"
  ON products
  FOR SELECT
  USING (is_active = true);

-- Políticas: Admin tiene acceso completo a categorías
CREATE POLICY "Authenticated users full access to categories"
  ON categories
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Políticas: Admin tiene acceso completo a productos
CREATE POLICY "Authenticated users full access to products"
  ON products
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Crear índices para mejorar performance
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_sort ON categories(sort_order);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(is_featured);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 4. Insertar Datos de Demo (Opcional)

Para probar rápidamente, inserta categorías de ejemplo:

```sql
INSERT INTO categories (name_es, name_en, slug, sort_order) VALUES
  ('Entradas', 'Starters', 'entradas', 1),
  ('Carnes', 'Meats', 'carnes', 2),
  ('Del Mar', 'Seafood', 'del-mar', 3),
  ('Pastas', 'Pastas', 'pastas', 4),
  ('Burgers', 'Burgers', 'burgers', 5),
  ('Postres', 'Desserts', 'postres', 6),
  ('Cocktails', 'Cocktails', 'cocktails', 7),
  ('Vinos Tintos', 'Red Wines', 'vinos-tintos', 8);

-- Productos de ejemplo
INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, is_featured)
SELECT
  (SELECT id FROM categories WHERE slug = 'entradas' LIMIT 1),
  'Tacos de Salmón',
  'Salmon Tacos',
  'Salmón, cebolla morada, cilantro, ají dulce, yuzu ponzu y alioli de trufa blanca.',
  'Salmon, red onion, cilantro, sweet pepper, yuzu ponzu and white truffle aioli.',
  14.00,
  true;

INSERT INTO products (category_id, name_es, name_en, description_es, description_en, price, price_alt, price_alt_label)
SELECT
  (SELECT id FROM categories WHERE slug = 'cocktails' LIMIT 1),
  'Aurora Mule',
  'Aurora Mule',
  'Gin Bombay, sirope de jengibre y romero, limón y ginger beer.',
  'Bombay gin, ginger and rosemary syrup, lemon and ginger beer.',
  13.00,
  NULL,
  NULL;
```

## 5. Configurar Autenticación (Para Panel Admin)

1. Ve a **Authentication** → **Providers**
2. **Email** debe estar habilitado por defecto
3. (Opcional) Puedes habilitar Google, GitHub, etc.

### Crear un usuario admin:

1. Ve a **Authentication** → **Users**
2. Click "Add user"
3. Elige "Create new user"
4. Completa:
   - **Email:** admin@cielorooftop.com (o el que prefieras)
   - **Password:** (tu password seguro)
   - **Auto Confirm User:** ✅ marcado
5. Click "Create user"

¡Ahora ya puedes hacer login en `/admin/login` con este email/password!

## 6. Configurar Storage (Para subir imágenes de productos)

1. Ve a **Storage**
2. Click "Create a new bucket"
3. Nombre: `product-images`
4. **Public bucket:** ✅ marcado (para que las imágenes sean públicas)
5. Click "Create bucket"

### Configurar políticas de Storage:

En el bucket `product-images`, click en "Policies" y agrega:

**Policy para lectura pública:**
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

**Policy para usuarios autenticados (upload):**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);
```

## 7. Verificar Configuración

Regresa a tu proyecto Next.js y verifica que `.env.local` esté correcto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

**Importante:** Asegúrate de que `.env.local` esté en `.gitignore` (ya debería estarlo).

## 8. Probar la Conexión

Reinicia el servidor de desarrollo:
```bash
npm run dev
```

Ahora deberías poder:
- ✅ Ver el menú público con categorías
- ✅ Hacer login en `/admin/login`
- ✅ Acceder al dashboard
- ✅ Ver estadísticas reales de la base de datos

## Comandos Útiles

### Regenerar tipos de TypeScript desde Supabase:
```bash
npx supabase gen types typescript --project-id "tu-project-id" > src/types/supabase.ts
```

### Ver logs en tiempo real:
En Supabase dashboard → **Logs** → **Query Performance**

## Troubleshooting

### Error: "No API key found"
- Verifica que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo

### Error: "relation does not exist"
- Las tablas no se crearon correctamente
- Ejecuta nuevamente el SQL de creación de tablas

### Error de autenticación
- Verifica que el usuario existe en Authentication → Users
- Verifica que "Auto Confirm User" esté marcado

## Próximos Pasos

Una vez configurado, puedes:
1. Crear más categorías desde el panel admin
2. Agregar productos con imágenes
3. Configurar tipos de Supabase para mejor autocompletado
4. Explorar las políticas RLS para mayor seguridad
