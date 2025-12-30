-- ============================================
-- CODEMENU V3 - MIGRACIONES SQL
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. Tabla de configuración del restaurante (horarios + info)
CREATE TABLE IF NOT EXISTS restaurant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insertar horarios y datos por defecto
INSERT INTO restaurant_settings (key, value) VALUES
('schedule', '{
  "monday": {"open": "17:00", "close": "00:00", "closed": false},
  "tuesday": {"open": "17:00", "close": "00:00", "closed": false},
  "wednesday": {"open": "17:00", "close": "00:00", "closed": false},
  "thursday": {"open": "17:00", "close": "00:00", "closed": false},
  "friday": {"open": "17:00", "close": "02:00", "closed": false},
  "saturday": {"open": "17:00", "close": "02:00", "closed": false},
  "sunday": {"open": "12:00", "close": "22:00", "closed": false}
}'::jsonb),
('restaurant_info', '{
  "name": "Tu Restaurante",
  "phone": "+1 555-0000",
  "whatsapp": "+1 555-0000",
  "address": "Your City",
  "instagram": "yourrestaurant"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- RLS para restaurant_settings
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read settings" ON restaurant_settings;
CREATE POLICY "Public read settings" ON restaurant_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin update settings" ON restaurant_settings;
CREATE POLICY "Admin update settings" ON restaurant_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 2. Tablas de Analytics
-- ============================================

-- Tabla de vistas de productos
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT
);

-- Tabla de vistas de categorías
CREATE TABLE IF NOT EXISTS category_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT
);

-- Índices para queries rápidas
CREATE INDEX IF NOT EXISTS idx_product_views_product ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_product_views_date ON product_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_category_views_category ON category_views(category_id);
CREATE INDEX IF NOT EXISTS idx_category_views_date ON category_views(viewed_at);

-- RLS para analytics
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert product views" ON product_views;
CREATE POLICY "Anyone can insert product views" ON product_views FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin read product views" ON product_views;
CREATE POLICY "Admin read product views" ON product_views FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Anyone can insert category views" ON category_views;
CREATE POLICY "Anyone can insert category views" ON category_views FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin read category views" ON category_views;
CREATE POLICY "Admin read category views" ON category_views FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================
-- 3. Agregar columna de tags a productos
-- ============================================

-- Agregar columna tags si no existe
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Índice para búsqueda de tags
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING GIN (tags);

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que las tablas se crearon correctamente
SELECT
  'restaurant_settings' as table_name,
  COUNT(*) as records
FROM restaurant_settings
UNION ALL
SELECT
  'product_views',
  COUNT(*)
FROM product_views
UNION ALL
SELECT
  'category_views',
  COUNT(*)
FROM category_views;

-- Verificar que la columna tags existe
SELECT
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name = 'tags';
