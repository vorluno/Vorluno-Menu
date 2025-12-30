'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/types/database'
import { getPlaceholderImage } from '@/lib/placeholder-images'
import { TagBadge } from './TagBadge'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  categorySlug: string
  index: number
  onClick?: () => void
}

export function ProductCard({ product, categorySlug, index, onClick }: ProductCardProps) {
  const locale = useLocale()
  const [imageSrc, setImageSrc] = useState(product.image_url || getPlaceholderImage(categorySlug, index))
  const [imageError, setImageError] = useState(false)

  const name = locale === 'es' ? product.name_es : product.name_en
  const description = locale === 'es' ? product.description_es : product.description_en

  const priceAltLabel = product.price_alt_label
    ? locale === 'es'
      ? product.price_alt_label
      : product.price_alt_label === 'Copa' ? 'Glass'
        : product.price_alt_label === 'Jarra' ? 'Pitcher'
          : 'Bottle'
    : null

  return (
    <Card
      className="group h-full overflow-hidden transition-luxury hover:shadow-luxury-lg hover:scale-[1.02] border-border/50 bg-card/80 backdrop-blur-sm cursor-pointer"
      onClick={onClick}
    >
      {/* Image - Square aspect ratio for compact mobile view */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          onError={() => {
            if (!imageError) {
              setImageError(true)
              setImageSrc(getPlaceholderImage(categorySlug, index))
            }
          }}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-3 sm:p-4 space-y-2">
        {/* Product name - truncated on mobile */}
        <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-accent transition-luxury min-h-[2.5rem] sm:min-h-[3rem]">
          {name}
        </h3>

        {/* Description - hidden on mobile, shown on tablet+ */}
        {description && (
          <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Price section - compact for mobile */}
        <div className="pt-2 border-t border-border/50 space-y-2">
          {product.price_alt && priceAltLabel ? (
            // Dual pricing - compact version
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{priceAltLabel}</span>
                <span className="text-sm sm:text-lg font-semibold">
                  <span className="text-accent">$</span>
                  <span className="text-foreground">{product.price_alt.toFixed(2)}</span>
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide text-right">
                  {priceAltLabel === 'Copa' || priceAltLabel === 'Glass' ? 'Botella' : 'Botella'}
                </span>
                <span className="text-sm sm:text-lg font-semibold">
                  <span className="text-accent">$</span>
                  <span className="text-foreground">{product.price.toFixed(2)}</span>
                </span>
              </div>
            </div>
          ) : (
            // Single price
            <div className="flex items-center justify-end">
              <span className="text-lg sm:text-2xl font-bold">
                <span className="text-accent">$</span>
                <span className="text-foreground">{product.price.toFixed(2)}</span>
              </span>
            </div>
          )}

          {/* Tags - show only icons on mobile, max 3 tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {product.tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} showLabel={false} size="sm" />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
