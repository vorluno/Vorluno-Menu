'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/database'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import { trackCategoryView } from '@/lib/analytics'

interface ProductsGridProps {
  products: Product[]
  categorySlug: string
  categoryId?: string
}

export function ProductsGrid({ products, categorySlug, categoryId }: ProductsGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<{ product: Product; index: number } | null>(null)

  // Track category view when component mounts
  useEffect(() => {
    if (categoryId) {
      trackCategoryView(categoryId)
    }
  }, [categoryId])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pb-12">
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              animation: `fade-in 0.5s ease-out ${index * 0.05}s both`
            }}
          >
            <ProductCard
              product={product}
              categorySlug={categorySlug}
              index={index}
              onClick={() => setSelectedProduct({ product, index })}
            />
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct.product}
          categorySlug={categorySlug}
          index={selectedProduct.index}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
