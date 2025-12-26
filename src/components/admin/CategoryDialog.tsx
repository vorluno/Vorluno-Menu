'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Category } from '@/types/database'
import { createCategory, updateCategory } from '@/app/[locale]/(admin)/dashboard/actions'
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
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface CategoryDialogProps {
  children: React.ReactNode
  category?: Category
}

export function CategoryDialog({ children, category }: CategoryDialogProps) {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name_es: category?.name_es || '',
    name_en: category?.name_en || '',
    slug: category?.slug || '',
    sort_order: category?.sort_order || 0,
    is_active: category?.is_active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = category
        ? await updateCategory(category.id, formData)
        : await createCategory(formData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(t('saveSuccess'))
      setOpen(false)

      if (!category) {
        setFormData({
          name_es: '',
          name_en: '',
          slug: '',
          sort_order: 0,
          is_active: true,
        })
      }
    } catch {
      toast.error('Error')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.name_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData((prev) => ({ ...prev, slug }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? t('editCategory') : t('newCategory')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name_es">{t('categoryName')} (ES)</Label>
              <Input
                id="name_es"
                value={formData.name_es}
                onChange={(e) => setFormData((prev) => ({ ...prev, name_es: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_en">{t('categoryName')} (EN)</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData((prev) => ({ ...prev, name_en: e.target.value }))}
                onBlur={generateSlug}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug">{t('slug')}</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
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
          </div>

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

          <div className="flex justify-end gap-2">
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
