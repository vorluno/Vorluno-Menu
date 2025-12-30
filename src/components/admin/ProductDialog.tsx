'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Product, Category } from '@/types/database'
import { createProduct, updateProduct } from '@/app/[locale]/(admin)/dashboard/actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { TagBadge } from '@/components/menu/TagBadge'
import { PRODUCT_TAGS, type ProductTag } from '@/lib/constants'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface ProductDialogProps {
  children: React.ReactNode
  product?: Product
  categories: Category[]
}

export function ProductDialog({ children, product, categories }: ProductDialogProps) {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    category_id: product?.category_id || '',
    name_es: product?.name_es || '',
    name_en: product?.name_en || '',
    description_es: product?.description_es || '',
    description_en: product?.description_en || '',
    price: product?.price || 0,
    price_alt: product?.price_alt || null,
    price_alt_label: product?.price_alt_label || '',
    image_url: product?.image_url || '',
    sort_order: product?.sort_order || 0,
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
    tags: product?.tags || [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        price_alt: formData.price_alt || null,
        price_alt_label: formData.price_alt_label || null,
        image_url: formData.image_url || null,
        description_es: formData.description_es || null,
        description_en: formData.description_en || null,
      }

      const result = product
        ? await updateProduct(product.id, data)
        : await createProduct(data)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(t('saveSuccess'))
      setOpen(false)

      if (!product) {
        setFormData({
          category_id: '',
          name_es: '',
          name_en: '',
          description_es: '',
          description_en: '',
          price: 0,
          price_alt: null,
          price_alt_label: '',
          image_url: '',
          sort_order: 0,
          is_active: true,
          is_featured: false,
          tags: [],
        })
      }
    } catch {
      toast.error('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? t('editProduct') : t('newProduct')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div className="space-y-2">
            <Label>{t('selectCategory')}</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category_id: value }))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name_es} / {category.name_en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name_es">{t('productName')} (ES)</Label>
              <Input
                id="name_es"
                value={formData.name_es}
                onChange={(e) => setFormData((prev) => ({ ...prev, name_es: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_en">{t('productName')} (EN)</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData((prev) => ({ ...prev, name_en: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description_es">Descripción (ES)</Label>
              <Textarea
                id="description_es"
                value={formData.description_es}
                onChange={(e) => setFormData((prev) => ({ ...prev, description_es: e.target.value }))}
                disabled={loading}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_en">Description (EN)</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => setFormData((prev) => ({ ...prev, description_en: e.target.value }))}
                disabled={loading}
                rows={3}
              />
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_alt">{t('priceAlt')} ($)</Label>
              <Input
                id="price_alt"
                type="number"
                step="0.01"
                min="0"
                value={formData.price_alt || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, price_alt: e.target.value ? parseFloat(e.target.value) : null }))}
                disabled={loading}
                placeholder="Optional"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_alt_label">{t('priceAltLabel')}</Label>
              <Input
                id="price_alt_label"
                value={formData.price_alt_label}
                onChange={(e) => setFormData((prev) => ({ ...prev, price_alt_label: e.target.value }))}
                disabled={loading}
                placeholder="Copa, Jarra..."
              />
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload
            value={formData.image_url}
            onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            disabled={loading}
            productId={product?.id || 'new'}
          />

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sort_order">{t('sortOrder')}</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
              disabled={loading}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <input
                id="is_active"
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                disabled={loading}
                className="h-4 w-4"
              />
              <Label htmlFor="is_active">{t('isActive')}</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="is_featured"
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                disabled={loading}
                className="h-4 w-4"
              />
              <Label htmlFor="is_featured">{t('isFeatured')}</Label>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
            <Label>Tags y Alérgenos</Label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(PRODUCT_TAGS) as ProductTag[]).map((tagKey) => {
                const tagData = PRODUCT_TAGS[tagKey]
                const isSelected = formData.tags.includes(tagKey)

                return (
                  <div
                    key={tagKey}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (!loading) {
                        setFormData((prev) => ({
                          ...prev,
                          tags: isSelected
                            ? prev.tags.filter((t) => t !== tagKey)
                            : [...prev.tags, tagKey]
                        }))
                      }
                    }}
                  >
                    <Checkbox
                      id={`tag-${tagKey}`}
                      checked={isSelected}
                      disabled={loading}
                      className="pointer-events-none"
                    />
                    <Label htmlFor={`tag-${tagKey}`} className="cursor-pointer flex-1">
                      <TagBadge tag={tagKey} showLabel={true} size="sm" />
                    </Label>
                  </div>
                )
              })}
            </div>
            {formData.tags.length > 0 && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Seleccionados ({formData.tags.length}):</p>
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} showLabel={true} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              {tCommon('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {tCommon('save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
