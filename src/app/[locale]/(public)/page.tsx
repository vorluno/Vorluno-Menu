import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { CategoryCard } from '@/components/menu/CategoryCard'
import { FeaturedCarousel } from '@/components/menu/FeaturedCarousel'
import { Category, Product } from '@/types/database'

// Demo categories for when Supabase is not configured
const demoCategories: Category[] = [
  { id: '1', name_es: 'Entradas', name_en: 'Starters', slug: 'entradas', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', name_es: 'Carnes', name_en: 'Meats', slug: 'carnes', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', name_es: 'Del Mar', name_en: 'Seafood', slug: 'del-mar', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', name_es: 'Pastas', name_en: 'Pastas', slug: 'pastas', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', name_es: 'Burgers', name_en: 'Burgers', slug: 'burgers', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', name_es: 'Sides', name_en: 'Sides', slug: 'sides', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
  { id: '7', name_es: 'Ensaladas', name_en: 'Salads', slug: 'ensaladas', sort_order: 7, is_active: true, created_at: '', updated_at: '' },
  { id: '8', name_es: 'Menú Infantil', name_en: 'Kids Menu', slug: 'menu-infantil', sort_order: 8, is_active: true, created_at: '', updated_at: '' },
  { id: '9', name_es: 'Postres', name_en: 'Desserts', slug: 'postres', sort_order: 9, is_active: true, created_at: '', updated_at: '' },
  { id: '10', name_es: 'Cocktails', name_en: 'Cocktails', slug: 'cocktails', sort_order: 10, is_active: true, created_at: '', updated_at: '' },
  { id: '11', name_es: 'Mocktails', name_en: 'Mocktails', slug: 'mocktails', sort_order: 11, is_active: true, created_at: '', updated_at: '' },
  { id: '12', name_es: 'Sangrías', name_en: 'Sangrias', slug: 'sangrias', sort_order: 12, is_active: true, created_at: '', updated_at: '' },
  { id: '13', name_es: 'Champañas', name_en: 'Champagnes', slug: 'champanas', sort_order: 13, is_active: true, created_at: '', updated_at: '' },
  { id: '14', name_es: 'Espumantes', name_en: 'Sparkling', slug: 'espumantes', sort_order: 14, is_active: true, created_at: '', updated_at: '' },
  { id: '15', name_es: 'Vinos Tintos', name_en: 'Red Wines', slug: 'vinos-tintos', sort_order: 15, is_active: true, created_at: '', updated_at: '' },
  { id: '16', name_es: 'Vinos Blancos', name_en: 'White Wines', slug: 'vinos-blancos', sort_order: 16, is_active: true, created_at: '', updated_at: '' },
  { id: '17', name_es: 'Vinos Rosados', name_en: 'Rosé Wines', slug: 'vinos-rosados', sort_order: 17, is_active: true, created_at: '', updated_at: '' },
]

type CategoryWithCount = Category & { productCount: number }

async function getFeaturedProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(slug)')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(8)

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*, products:products(count)')
      .eq('is_active', true)
      .eq('products.is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      // Return demo data with fake counts
      return demoCategories.map(cat => ({
        ...cat,
        productCount: Math.floor(Math.random() * 15) + 3 // Random 3-18
      }))
    }

    return data.map((cat) => ({
      ...(cat as Category),
      productCount: (cat as { products?: Array<{ count: number }> }).products?.[0]?.count || 0
    }))
  } catch {
    // Return demo data with fake counts
    return demoCategories.map(cat => ({
      ...cat,
      productCount: Math.floor(Math.random() * 15) + 3 // Random 3-18
    }))
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('menu')
  const tCommon = await getTranslations('common')
  const categories = await getCategoriesWithCounts()
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Decorative line top */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <div className="h-2 w-2 rounded-full bg-accent" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary tracking-tight">
              {t('title')}
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Decorative line bottom */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <div className="h-2 w-2 rounded-full bg-accent" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <FeaturedCarousel products={featuredProducts} />
      )}

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-3">
            {t('categories')}
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              style={{
                animation: `fade-in 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              <CategoryCard
                category={category}
                productCount={category.productCount}
                itemsLabel={tCommon('items')}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
