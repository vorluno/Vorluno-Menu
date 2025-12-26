'use client'

import { useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Category } from '@/types/database'
import {
  UtensilsCrossed,
  Beef,
  Fish,
  Salad,
  IceCream,
  Wine,
  GlassWater,
  Sparkles,
  Baby,
  Grape,
  Martini,
  Beer,
  Coffee
} from 'lucide-react'

const categoryIcons: Record<string, React.ElementType> = {
  'entradas': UtensilsCrossed,
  'carnes': Beef,
  'del-mar': Fish,
  'pastas': UtensilsCrossed,
  'burgers': Beef,
  'sides': Salad,
  'ensaladas': Salad,
  'menu-infantil': Baby,
  'postres': IceCream,
  'cocktails': Martini,
  'mocktails': GlassWater,
  'sangrias': Wine,
  'champanas': Sparkles,
  'espumantes': Beer,
  'vinos-tintos': Wine,
  'vinos-blancos': Wine,
  'vinos-rosados': Grape,
}

interface CategoryCardProps {
  category: Category
  productCount?: number
  itemsLabel?: string
}

export function CategoryCard({ category, productCount, itemsLabel = 'items' }: CategoryCardProps) {
  const locale = useLocale()
  const name = locale === 'es' ? category.name_es : category.name_en
  const Icon = categoryIcons[category.slug] || Coffee

  return (
    <Link href={`/menu/${category.slug}`} className="group">
      <Card className="h-full transition-luxury hover:shadow-luxury hover:scale-[1.02] border-border/50 hover:border-accent/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[160px] gap-3">
          {/* Icon circle with gold border on hover */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-accent/30 transition-luxury scale-110" />
            <div className="rounded-full bg-gradient-to-br from-primary/5 to-accent/5 p-5 transition-luxury group-hover:from-accent/10 group-hover:to-accent/20 group-hover:scale-110">
              <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-luxury" />
            </div>
          </div>

          {/* Category name in serif font */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-luxury">
              {name}
            </h3>
            {/* Decorative gold line */}
            <div className="h-0.5 w-8 bg-accent/50 mx-auto transition-all group-hover:w-12 group-hover:bg-accent" />
          </div>

          {/* Product count */}
          {productCount !== undefined && (
            <p className="text-xs text-muted-foreground">
              {productCount} {itemsLabel}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
