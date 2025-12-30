'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Product } from '@/types/database'
import { ProductCard } from './ProductCard'
import { useState } from 'react'
import { ProductModal } from './ProductModal'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

interface FeaturedCarouselProps {
  products: Array<Product & { categories: { slug: string } | null }>
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const t = useTranslations('menu')
  const locale = useLocale()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('')

  if (!products || products.length === 0) {
    return null
  }

  const handleProductClick = (product: Product, index: number, categorySlug: string) => {
    setSelectedProduct(product)
    setSelectedIndex(index)
    setSelectedCategorySlug(categorySlug)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8
    const newScrollPosition =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-accent fill-accent" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                {locale === 'es' ? 'Recomendados del Chef' : "Chef's Picks"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {locale === 'es' ? 'Nuestras especialidades seleccionadas' : 'Our curated specialties'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel - Horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Mobile: Horizontal scroll */}
          <div
            ref={scrollContainerRef}
            className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-none w-[280px] snap-start"
              >
                <ProductCard
                  product={product}
                  categorySlug={product.categories?.slug || ''}
                  index={index}
                  onClick={() =>
                    handleProductClick(product, index, product.categories?.slug || '')
                  }
                />
              </div>
            ))}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={product.categories?.slug || ''}
                index={index}
                onClick={() =>
                  handleProductClick(product, index, product.categories?.slug || '')
                }
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator dots removed - causes ref access during render */}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        categorySlug={selectedCategorySlug}
        index={selectedIndex}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
