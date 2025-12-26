'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Product } from '@/types/database'
import { getPlaceholderImage } from '@/lib/placeholder-images'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductModalProps {
  product: Product | null
  categorySlug: string
  index: number
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, categorySlug, index, isOpen, onClose }: ProductModalProps) {
  const locale = useLocale()
  const [imageSrc, setImageSrc] = useState(product?.image_url || getPlaceholderImage(categorySlug, index))
  const [imageError, setImageError] = useState(false)

  if (!product) return null

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Close button - absolute positioned */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image - 16:9 aspect ratio */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onError={() => {
              if (!imageError) {
                setImageError(true)
                setImageSrc(getPlaceholderImage(categorySlug, index))
              }
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title and decorative line */}
          <div className="space-y-3">
            <DialogTitle className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
              {name}
            </DialogTitle>
            <div className="h-1 w-16 bg-accent rounded-full" />
          </div>

          {/* Description */}
          {description && (
            <p className="text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {/* Price section */}
          <div className="pt-4 border-t border-border/50">
            {product.price_alt && priceAltLabel ? (
              // Dual pricing
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                    {priceAltLabel}
                  </span>
                  <span className="text-3xl font-bold">
                    <span className="text-accent">$</span>
                    <span className="text-foreground">{product.price_alt.toFixed(2)}</span>
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                    {priceAltLabel === 'Copa' || priceAltLabel === 'Glass' ? 'Botella / Bottle' : 'Botella'}
                  </span>
                  <span className="text-3xl font-bold">
                    <span className="text-accent">$</span>
                    <span className="text-foreground">{product.price.toFixed(2)}</span>
                  </span>
                </div>
              </div>
            ) : (
              // Single price
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold">
                  <span className="text-accent">$</span>
                  <span className="text-foreground">{product.price.toFixed(2)}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
