import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard'

async function getAnalyticsData() {
  try {
    const supabase = await createClient()

    // Top products (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: productViews } = await supabase
      .from('product_views')
      .select('product_id, products(name_es, name_en)')
      .gte('viewed_at', sevenDaysAgo.toISOString())

    // Top categories
    const { data: categoryViews } = await supabase
      .from('category_views')
      .select('category_id, categories(name_es, name_en)')
      .gte('viewed_at', sevenDaysAgo.toISOString())

    // Views by day (last 7 days)
    const { data: dailyViews } = await supabase
      .from('product_views')
      .select('viewed_at')
      .gte('viewed_at', sevenDaysAgo.toISOString())
      .order('viewed_at', { ascending: true })

    // Today's views
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { data: todayViews } = await supabase
      .from('product_views')
      .select('id')
      .gte('viewed_at', todayStart.toISOString())

    // Yesterday's views
    const yesterdayStart = new Date(todayStart)
    yesterdayStart.setDate(yesterdayStart.getDate() - 1)

    const { data: yesterdayViews } = await supabase
      .from('product_views')
      .select('id')
      .gte('viewed_at', yesterdayStart.toISOString())
      .lt('viewed_at', todayStart.toISOString())

    return {
      productViews: productViews || [],
      categoryViews: categoryViews || [],
      dailyViews: dailyViews || [],
      todayCount: todayViews?.length || 0,
      yesterdayCount: yesterdayViews?.length || 0,
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return {
      productViews: [],
      categoryViews: [],
      dailyViews: [],
      todayCount: 0,
      yesterdayCount: 0,
    }
  }
}

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('admin')
  const data = await getAnalyticsData()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Estadísticas de visualizaciones de productos y categorías
        </p>
      </div>

      <AnalyticsDashboard data={data} locale={locale} />
    </div>
  )
}
