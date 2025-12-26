import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { ProductsTable } from '@/components/admin/ProductsTable'
import { ProductDialog } from '@/components/admin/ProductDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

async function getProductsAndCategories() {
  try {
    const supabase = await createClient()

    const [productsResult, categoriesResult] = await Promise.all([
      supabase
        .from('products')
        .select('*, categories(*)')
        .order('sort_order', { ascending: true }),
      supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
    ])

    return {
      products: productsResult.data || [],
      categories: categoriesResult.data || [],
    }
  } catch {
    return { products: [], categories: [] }
  }
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('admin')
  const { products, categories } = await getProductsAndCategories()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('products')}</h1>
        <ProductDialog categories={categories}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('newProduct')}
          </Button>
        </ProductDialog>
      </div>

      <ProductsTable products={products} categories={categories} />
    </div>
  )
}
