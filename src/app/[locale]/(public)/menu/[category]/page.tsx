import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { ProductsGrid } from '@/components/menu/ProductsGrid'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/i18n/navigation'
import { ArrowLeft } from 'lucide-react'
import { Category, Product } from '@/types/database'
import { notFound } from 'next/navigation'

// Demo products for when Supabase is not configured
const demoProducts: Record<string, Product[]> = {
  'entradas': [
    { id: '1', category_id: '1', name_es: 'Tacos de Salmón', name_en: 'Salmon Tacos', description_es: 'Salmón, cebolla morada, cilantro, ají dulce, yuzu ponzu y alioli de trufa blanca.', description_en: 'Salmon, red onion, cilantro, sweet pepper, yuzu ponzu and white truffle aioli.', price: 14, price_alt: null, price_alt_label: null, image_url: null, is_active: true, is_featured: false, sort_order: 1, created_at: '', updated_at: '' },
    { id: '2', category_id: '1', name_es: 'Tartar de Atún', name_en: 'Tuna Tartare', description_es: 'Atún, cebolla morada, cilantro, ají dulce, tomate, pepino, aguacate, aceite de trufa blanca y salsa poke con kimchee.', description_en: 'Tuna, red onion, cilantro, sweet pepper, tomato, cucumber, avocado, white truffle oil and poke sauce with kimchi.', price: 14, price_alt: null, price_alt_label: null, image_url: null, is_active: true, is_featured: true, sort_order: 2, created_at: '', updated_at: '' },
    { id: '3', category_id: '1', name_es: 'Ceviche de Pulpo', name_en: 'Octopus Ceviche', description_es: 'Pulpo, cebolla morada, cilantro, ají dulce, tomate, pepino y leche de tigre.', description_en: 'Octopus, red onion, cilantro, sweet pepper, tomato, cucumber and tiger\'s milk.', price: 16, price_alt: null, price_alt_label: null, image_url: null, is_active: true, is_featured: false, sort_order: 3, created_at: '', updated_at: '' },
  ],
  'cocktails': [
    { id: '4', category_id: '10', name_es: 'Aurora Mule', name_en: 'Aurora Mule', description_es: 'Gin Bombay, sirope de jengibre y romero, limón y ginger beer.', description_en: 'Bombay gin, ginger and rosemary syrup, lemon and ginger beer.', price: 13, price_alt: null, price_alt_label: null, image_url: null, is_active: true, is_featured: true, sort_order: 1, created_at: '', updated_at: '' },
    { id: '5', category_id: '10', name_es: 'Sky Blue Margarita', name_en: 'Sky Blue Margarita', description_es: 'Tequila Jose Cuervo, blue curaçao, triple sec, limón y sirope simple.', description_en: 'Jose Cuervo tequila, blue curaçao, triple sec, lime and simple syrup.', price: 12, price_alt: null, price_alt_label: null, image_url: null, is_active: true, is_featured: false, sort_order: 2, created_at: '', updated_at: '' },
  ],
  'sangrias': [
    { id: '6', category_id: '12', name_es: 'Sangría Rosé', name_en: 'Rosé Sangria', description_es: 'Vino rosado, licor de lychee, jugo de fresa, sirope simple, ginger ale, frutas varias y limón.', description_en: 'Rosé wine, lychee liqueur, strawberry juice, simple syrup, ginger ale, mixed fruits and lemon.', price: 11, price_alt: 30, price_alt_label: 'Jarra', image_url: null, is_active: true, is_featured: false, sort_order: 1, created_at: '', updated_at: '' },
  ],
  'vinos-tintos': [
    { id: '7', category_id: '15', name_es: 'Luigi Bosca Malbec', name_en: 'Luigi Bosca Malbec', description_es: 'Argentina', description_en: 'Argentina', price: 45, price_alt: 7, price_alt_label: 'Copa', image_url: null, is_active: true, is_featured: false, sort_order: 1, created_at: '', updated_at: '' },
  ],
}

const demoCategories: Record<string, Category> = {
  'entradas': { id: '1', name_es: 'Entradas', name_en: 'Starters', slug: 'entradas', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  'carnes': { id: '2', name_es: 'Carnes', name_en: 'Meats', slug: 'carnes', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  'del-mar': { id: '3', name_es: 'Del Mar', name_en: 'Seafood', slug: 'del-mar', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  'pastas': { id: '4', name_es: 'Pastas', name_en: 'Pastas', slug: 'pastas', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  'burgers': { id: '5', name_es: 'Burgers', name_en: 'Burgers', slug: 'burgers', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  'sides': { id: '6', name_es: 'Sides', name_en: 'Sides', slug: 'sides', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
  'ensaladas': { id: '7', name_es: 'Ensaladas', name_en: 'Salads', slug: 'ensaladas', sort_order: 7, is_active: true, created_at: '', updated_at: '' },
  'menu-infantil': { id: '8', name_es: 'Menú Infantil', name_en: 'Kids Menu', slug: 'menu-infantil', sort_order: 8, is_active: true, created_at: '', updated_at: '' },
  'postres': { id: '9', name_es: 'Postres', name_en: 'Desserts', slug: 'postres', sort_order: 9, is_active: true, created_at: '', updated_at: '' },
  'cocktails': { id: '10', name_es: 'Cocktails', name_en: 'Cocktails', slug: 'cocktails', sort_order: 10, is_active: true, created_at: '', updated_at: '' },
  'mocktails': { id: '11', name_es: 'Mocktails', name_en: 'Mocktails', slug: 'mocktails', sort_order: 11, is_active: true, created_at: '', updated_at: '' },
  'sangrias': { id: '12', name_es: 'Sangrías', name_en: 'Sangrias', slug: 'sangrias', sort_order: 12, is_active: true, created_at: '', updated_at: '' },
  'champanas': { id: '13', name_es: 'Champañas', name_en: 'Champagnes', slug: 'champanas', sort_order: 13, is_active: true, created_at: '', updated_at: '' },
  'espumantes': { id: '14', name_es: 'Espumantes', name_en: 'Sparkling', slug: 'espumantes', sort_order: 14, is_active: true, created_at: '', updated_at: '' },
  'vinos-tintos': { id: '15', name_es: 'Vinos Tintos', name_en: 'Red Wines', slug: 'vinos-tintos', sort_order: 15, is_active: true, created_at: '', updated_at: '' },
  'vinos-blancos': { id: '16', name_es: 'Vinos Blancos', name_en: 'White Wines', slug: 'vinos-blancos', sort_order: 16, is_active: true, created_at: '', updated_at: '' },
  'vinos-rosados': { id: '17', name_es: 'Vinos Rosados', name_en: 'Rosé Wines', slug: 'vinos-rosados', sort_order: 17, is_active: true, created_at: '', updated_at: '' },
}

async function getCategoryAndProducts(slug: string): Promise<{ category: Category | null; products: Product[] }> {
  try {
    const supabase = await createClient()

    // Get category
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (categoryError || !category) {
      // Return demo data
      const demoCategory = demoCategories[slug]
      if (!demoCategory) return { category: null, products: [] }
      return { category: demoCategory, products: demoProducts[slug] || [] }
    }

    // Get products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (productsError) {
      return { category, products: [] }
    }

    return { category, products: products || [] }
  } catch {
    // Return demo data on error
    const demoCategory = demoCategories[slug]
    if (!demoCategory) return { category: null, products: [] }
    return { category: demoCategory, products: demoProducts[slug] || [] }
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category: categorySlug } = await params
  setRequestLocale(locale)

  const t = await getTranslations('menu')
  const tCommon = await getTranslations('common')
  const { category, products } = await getCategoryAndProducts(categorySlug)

  if (!category) {
    notFound()
  }

  const categoryName = locale === 'es' ? category.name_es : category.name_en

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back button - elegant design */}
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6 -ml-2 gap-2 hover:bg-accent/10 hover:text-accent transition-luxury group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {tCommon('back')}
          </Button>
        </Link>

        {/* Category header - premium design */}
        <div className="text-center mb-12 space-y-4">
          {/* Decorative line top */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {categoryName}
          </h1>

          {/* Decorative line bottom */}
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
        </div>

        {/* Products grid - 2 columns mobile, 3 tablet, 4 desktop */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">{t('noProducts')}</p>
          </div>
        ) : (
          <ProductsGrid products={products} categorySlug={categorySlug} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category: categorySlug } = await params
  const { category } = await getCategoryAndProducts(categorySlug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  const categoryName = locale === 'es' ? category.name_es : category.name_en
  return { title: categoryName }
}
