'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface DeleteDialogProps {
  children: React.ReactNode
  onDelete: () => Promise<{ error?: string; success?: boolean }>
  itemName: string
}

export function DeleteDialog({ children, onDelete, itemName }: DeleteDialogProps) {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    try {
      const result = await onDelete()

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(t('deleteSuccess'))
      setOpen(false)
    } catch {
      toast.error('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tCommon('delete')}</DialogTitle>
          <DialogDescription>
            {t('confirmDelete')}
            <br />
            <span className="font-semibold">{itemName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            {tCommon('cancel')}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {tCommon('delete')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
