'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Product, Category, ProductWithCategory } from '@/types/database'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductDialog } from './ProductDialog'
import { DeleteDialog } from './DeleteDialog'
import { Pencil, Trash2, Check, X, Star, Search, RotateCcw } from 'lucide-react'
import { deleteProduct, restoreProduct } from '@/app/[locale]/(admin)/dashboard/actions'
import { toast } from 'sonner'

interface ProductsTableProps {
  products: (Product & { categories: Category | null })[]
  categories: Category[]
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
  const t = useTranslations('admin')
  const locale = useLocale()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = locale === 'es' ? product.name_es : product.name_en
      const description = locale === 'es' ? product.description_es : product.description_en

      // Search filter
      const matchesSearch = search === '' ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        (description?.toLowerCase().includes(search.toLowerCase()) ?? false)

      // Category filter
      const matchesCategory = categoryFilter === 'all' || product.category_id === categoryFilter

      // Status filter
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && product.is_active) ||
        (statusFilter === 'inactive' && !product.is_active) ||
        (statusFilter === 'featured' && product.is_featured)

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, search, categoryFilter, statusFilter, locale])

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {locale === 'es' ? category.name_es : category.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active only</SelectItem>
            <SelectItem value="inactive">Inactive only</SelectItem>
            <SelectItem value="featured">Featured only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Table */}
    <div className="rounded-lg border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('productName')}</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">{t('isActive')}</TableHead>
            <TableHead className="text-center">{t('isFeatured')}</TableHead>
            <TableHead className="text-right">{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                {products.length === 0 ? 'No products found' : 'No products match your filters'}
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {locale === 'es' ? product.name_es : product.name_en}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.categories
                    ? locale === 'es'
                      ? product.categories.name_es
                      : product.categories.name_en
                    : '-'}
                </TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                  {product.price_alt && (
                    <span className="text-muted-foreground text-xs block">
                      {product.price_alt_label}: ${product.price_alt.toFixed(2)}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {product.is_active ? (
                    <Check className="mx-auto h-4 w-4 text-green-500" />
                  ) : (
                    <X className="mx-auto h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {product.is_featured && (
                    <Star className="mx-auto h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ProductDialog product={product} categories={categories}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </ProductDialog>
                    {product.is_active ? (
                      <DeleteDialog
                        onDelete={() => deleteProduct(product.id)}
                        itemName={locale === 'es' ? product.name_es : product.name_en}
                      >
                        <Button variant="outline" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteDialog>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600 hover:text-green-700"
                        onClick={async () => {
                          const result = await restoreProduct(product.id)
                          if (result.error) {
                            toast.error(result.error)
                          } else {
                            toast.success('Product restored successfully')
                          }
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}
