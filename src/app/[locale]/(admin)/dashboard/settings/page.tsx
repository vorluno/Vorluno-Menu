import { getTranslations, setRequestLocale } from 'next-intl/server'
import { SettingsForm } from '@/components/admin/SettingsForm'

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('admin')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('settings')}</h1>
        <p className="text-muted-foreground mt-2">
          Configura los horarios y la información del restaurante
        </p>
      </div>

      <SettingsForm />
    </div>
  )
}
