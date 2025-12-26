'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Category } from '@/types/database'
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
import { CategoryDialog } from './CategoryDialog'
import { DeleteDialog } from './DeleteDialog'
import { Pencil, Trash2, Check, X, Search, RotateCcw } from 'lucide-react'
import { deleteCategory, restoreCategory } from '@/app/[locale]/(admin)/dashboard/actions'
import { toast } from 'sonner'

interface CategoriesTableProps {
  categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const t = useTranslations('admin')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter categories
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      // Search filter
      const matchesSearch = search === '' ||
        category.name_es.toLowerCase().includes(search.toLowerCase()) ||
        category.name_en.toLowerCase().includes(search.toLowerCase()) ||
        category.slug.toLowerCase().includes(search.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && category.is_active) ||
        (statusFilter === 'inactive' && !category.is_active)

      return matchesSearch && matchesStatus
    })
  }, [categories, search, statusFilter])

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active only</SelectItem>
            <SelectItem value="inactive">Inactive only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCategories.length} of {categories.length} categories
      </div>

      {/* Table */}
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('categoryName')} (ES)</TableHead>
            <TableHead>{t('categoryName')} (EN)</TableHead>
            <TableHead>{t('slug')}</TableHead>
            <TableHead className="text-center">{t('sortOrder')}</TableHead>
            <TableHead className="text-center">{t('isActive')}</TableHead>
            <TableHead className="text-right">{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                {categories.length === 0 ? 'No categories found' : 'No categories match your filters'}
              </TableCell>
            </TableRow>
          ) : (
            filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name_es}</TableCell>
                <TableCell>{category.name_en}</TableCell>
                <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                <TableCell className="text-center">{category.sort_order}</TableCell>
                <TableCell className="text-center">
                  {category.is_active ? (
                    <Check className="mx-auto h-4 w-4 text-green-500" />
                  ) : (
                    <X className="mx-auto h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <CategoryDialog category={category}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </CategoryDialog>
                    {category.is_active ? (
                      <DeleteDialog
                        onDelete={() => deleteCategory(category.id)}
                        itemName={category.name_es}
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
                          const result = await restoreCategory(category.id)
                          if (result.error) {
                            toast.error(result.error)
                          } else {
                            toast.success('Category restored successfully')
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
  )
}
