# CodeMenu - Digital Menu PWA

## Project Overview
Modern digital menu PWA for restaurants. Public menu viewing + Admin panel for CRUD operations.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Database/Auth**: Supabase (PostgreSQL + Auth + RLS)
- **Styling**: Tailwind CSS + shadcn/ui
- **PWA**: next-pwa with offline support
- **i18n**: next-intl (ES/EN)

## Project Structure
```
src/
├── app/
│   ├── [locale]/           # i18n routes
│   │   ├── (public)/       # Public menu pages
│   │   │   ├── page.tsx    # Landing/categories
│   │   │   └── menu/[category]/page.tsx
│   │   └── (admin)/        # Protected admin routes
│   │       └── dashboard/
│   ├── api/                # API routes if needed
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── ui/                 # shadcn components
│   ├── menu/               # Menu-specific components
│   └── admin/              # Admin components
├── lib/
│   ├── supabase/           # Client + server configs
│   ├── i18n/               # Translation configs
│   └── utils.ts
├── types/
│   └── database.ts         # Supabase types
└── messages/               # i18n JSON files
    ├── es.json
    └── en.json
```

## Database Schema (Supabase)
```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  price_alt DECIMAL(10,2),          -- For items with bottle/glass prices
  price_alt_label TEXT,              -- "Copa" / "Botella"
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin all categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
```

## Code Conventions
- Use TypeScript strict mode
- Server Components by default, 'use client' only when needed
- Soft deletes: Set is_active = false, never DELETE
- All prices in USD, format: $XX.XX
- Mobile-first responsive design
- Minimum touch target: 44x44px

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npx supabase gen types typescript` - Regenerate DB types

## Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Design Guidelines
- Primary color: Navy blue (#1e3a5f)
- Accent: Gold/amber (#d4af37)
- Background: Clean white/light gray
- Typography: Clean sans-serif (Inter or similar)
- Cards with subtle shadows for menu items
- Category icons/images for visual navigation
