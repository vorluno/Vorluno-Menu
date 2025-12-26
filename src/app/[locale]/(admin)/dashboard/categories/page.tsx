import { getTranslations, setRequestLocale } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { CategoriesTable } from '@/components/admin/CategoriesTable'
import { CategoryDialog } from '@/components/admin/CategoryDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

async function getCategories() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('admin')
  const categories = await getCategories()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('categories')}</h1>
        <CategoryDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('newCategory')}
          </Button>
        </CategoryDialog>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  )
}
