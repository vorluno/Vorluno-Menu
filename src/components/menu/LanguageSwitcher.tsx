'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/lib/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LanguageSwitcher() {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-auto gap-2 border-border/50 bg-card/50 backdrop-blur-sm text-foreground hover:bg-card hover:border-accent transition-luxury">
        <Globe className="h-4 w-4 text-accent" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card/95 backdrop-blur-lg border-border">
        <SelectItem value="es" className="hover:bg-accent/10 hover:text-accent cursor-pointer">
          {t('spanish')}
        </SelectItem>
        <SelectItem value="en" className="hover:bg-accent/10 hover:text-accent cursor-pointer">
          {t('english')}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
