'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Eye, Calendar } from 'lucide-react'

interface AnalyticsData {
  productViews: Array<{ product_id: string; products: { name_es: string; name_en: string } | null }>
  categoryViews: Array<{ category_id: string; categories: { name_es: string; name_en: string } | null }>
  dailyViews: Array<{ viewed_at: string }>
  todayCount: number
  yesterdayCount: number
}

interface AnalyticsDashboardProps {
  data: AnalyticsData
  locale: string
}

export function AnalyticsDashboard({ data, locale }: AnalyticsDashboardProps) {
  // Process top products
  const productCounts: Record<string, { name: string; count: number }> = {}
  data.productViews.forEach((view) => {
    if (view.products) {
      const id = view.product_id
      const name = locale === 'es' ? view.products.name_es : view.products.name_en
      if (!productCounts[id]) {
        productCounts[id] = { name, count: 0 }
      }
      productCounts[id].count++
    }
  })

  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)

  // Process top categories
  const categoryCounts: Record<string, { name: string; count: number }> = {}
  data.categoryViews.forEach((view) => {
    if (view.categories) {
      const id = view.category_id
      const name = locale === 'es' ? view.categories.name_es : view.categories.name_en
      if (!categoryCounts[id]) {
        categoryCounts[id] = { name, count: 0 }
      }
      categoryCounts[id].count++
    }
  })

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)

  // Process daily views
  const dailyViewCounts: Record<string, number> = {}
  data.dailyViews.forEach((view) => {
    const date = new Date(view.viewed_at).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
    })
    dailyViewCounts[date] = (dailyViewCounts[date] || 0) + 1
  })

  const dailyData = Object.entries(dailyViewCounts).slice(-7)

  // Calculate trend
  const trend = data.todayCount - data.yesterdayCount
  const trendPercent = data.yesterdayCount > 0
    ? ((trend / data.yesterdayCount) * 100).toFixed(1)
    : '0'

  const maxCount = topProducts[0]?.count || 1

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vistas Hoy
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.todayCount}</div>
            <div className="flex items-center gap-1 mt-2 text-sm">
              {trend >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                {trend >= 0 ? '+' : ''}{trendPercent}%
              </span>
              <span className="text-muted-foreground">vs ayer ({data.yesterdayCount})</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Última Semana
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.productViews.length}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Visualizaciones de productos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Vistas por Día</CardTitle>
          <CardDescription>Últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dailyData.map(([date, count]) => {
              const percentage = (count / Math.max(...dailyData.map(([, c]) => c))) * 100
              return (
                <div key={date} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16">{date}</span>
                  <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full bg-accent/80 flex items-center justify-end pr-2"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs font-semibold text-primary">{count}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {dailyData.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay datos disponibles
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Products and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Productos</CardTitle>
            <CardDescription>Más vistos en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map(([id, { name, count }], index) => {
                const percentage = (count / maxCount) * 100
                return (
                  <div key={id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate flex-1">
                        {index + 1}. {name}
                      </span>
                      <span className="text-muted-foreground ml-2">{count} vistas</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {topProducts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay datos disponibles
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Categorías</CardTitle>
            <CardDescription>Más visitadas en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.map(([id, { name, count }], index) => {
                const maxCategoryCount = topCategories[0]?.count || 1
                const percentage = (count / maxCategoryCount) * 100
                return (
                  <div key={id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate flex-1">
                        {index + 1}. {name}
                      </span>
                      <span className="text-muted-foreground ml-2">{count} visitas</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {topCategories.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay datos disponibles
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
