import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderTree, Package, Star, CheckCircle2 } from 'lucide-react'

async function getStats() {
  try {
    const supabase = await createClient()

    const [categoriesResult, productsResult, featuredResult, activeResult] = await Promise.all([
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_featured', true),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    ])

    return {
      categories: categoriesResult.count || 0,
      products: productsResult.count || 0,
      featured: featuredResult.count || 0,
      active: activeResult.count || 0,
    }
  } catch {
    return { categories: 0, products: 0, featured: 0, active: 0 }
  }
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('admin')
  const stats = await getStats()

  const cards = [
    { title: t('totalCategories'), value: stats.categories, icon: FolderTree, color: 'text-blue-500' },
    { title: t('totalProducts'), value: stats.products, icon: Package, color: 'text-green-500' },
    { title: t('activeProducts'), value: stats.active, icon: CheckCircle2, color: 'text-emerald-500' },
    { title: t('featuredProducts'), value: stats.featured, icon: Star, color: 'text-yellow-500' },
  ]

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('welcome')}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
