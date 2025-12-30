'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Save, Clock, Info } from 'lucide-react'

interface ScheduleDay {
  open: string
  close: string
  closed: boolean
}

interface Schedule {
  monday: ScheduleDay
  tuesday: ScheduleDay
  wednesday: ScheduleDay
  thursday: ScheduleDay
  friday: ScheduleDay
  saturday: ScheduleDay
  sunday: ScheduleDay
}

interface RestaurantInfo {
  name: string
  phone: string
  whatsapp: string
  address: string
  instagram: string
}

const DAYS: Array<keyof Schedule> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_LABELS: Record<keyof Schedule, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo'
}

export function SettingsForm() {
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const supabase = createClient()

    const { data: scheduleData } = await supabase
      .from('restaurant_settings')
      .select('value')
      .eq('key', 'schedule')
      .single()

    const { data: infoData } = await supabase
      .from('restaurant_settings')
      .select('value')
      .eq('key', 'restaurant_info')
      .single()

    if (scheduleData) {
      setSchedule(scheduleData.value as Schedule)
    }

    if (infoData) {
      setRestaurantInfo(infoData.value as RestaurantInfo)
    }

    setLoading(false)
  }

  const handleScheduleChange = (day: keyof Schedule, field: keyof ScheduleDay, value: string | boolean) => {
    if (!schedule) return

    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value
      }
    })
  }

  const handleInfoChange = (field: keyof RestaurantInfo, value: string) => {
    if (!restaurantInfo) return

    setRestaurantInfo({
      ...restaurantInfo,
      [field]: value
    })
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      const supabase = createClient()

      // Update schedule
      if (schedule) {
        const { error: scheduleError } = await supabase
          .from('restaurant_settings')
          .update({ value: schedule, updated_at: new Date().toISOString() })
          .eq('key', 'schedule')

        if (scheduleError) throw scheduleError
      }

      // Update restaurant info
      if (restaurantInfo) {
        const { error: infoError } = await supabase
          .from('restaurant_settings')
          .update({ value: restaurantInfo, updated_at: new Date().toISOString() })
          .eq('key', 'restaurant_info')

        if (infoError) throw infoError
      }

      toast.success('Configuración guardada exitosamente')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Cargando configuración...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Restaurant Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-accent" />
            <CardTitle>Información del Restaurante</CardTitle>
          </div>
          <CardDescription>
            Información de contacto y redes sociales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={restaurantInfo?.name || ''}
                onChange={(e) => handleInfoChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={restaurantInfo?.phone || ''}
                onChange={(e) => handleInfoChange('phone', e.target.value)}
                placeholder="+1 555-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={restaurantInfo?.whatsapp || ''}
                onChange={(e) => handleInfoChange('whatsapp', e.target.value)}
                placeholder="+1 555-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={restaurantInfo?.instagram || ''}
                onChange={(e) => handleInfoChange('instagram', e.target.value)}
                placeholder="yourrestaurant"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={restaurantInfo?.address || ''}
                onChange={(e) => handleInfoChange('address', e.target.value)}
                placeholder="Your City"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            <CardTitle>Horarios de Atención</CardTitle>
          </div>
          <CardDescription>
            Configura los horarios de apertura y cierre para cada día de la semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DAYS.map((day) => {
              const daySchedule = schedule?.[day]
              if (!daySchedule) return null

              return (
                <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-32 font-medium">{DAY_LABELS[day]}</div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`${day}-closed`}
                      checked={daySchedule.closed}
                      onCheckedChange={(checked) =>
                        handleScheduleChange(day, 'closed', checked as boolean)
                      }
                    />
                    <Label htmlFor={`${day}-closed`} className="cursor-pointer">
                      Cerrado
                    </Label>
                  </div>

                  {!daySchedule.closed && (
                    <>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`${day}-open`} className="w-16">Abre:</Label>
                        <Input
                          id={`${day}-open`}
                          type="time"
                          value={daySchedule.open}
                          onChange={(e) => handleScheduleChange(day, 'open', e.target.value)}
                          className="w-32"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label htmlFor={`${day}-close`} className="w-16">Cierra:</Label>
                        <Input
                          id={`${day}-close`}
                          type="time"
                          value={daySchedule.close}
                          onChange={(e) => handleScheduleChange(day, 'close', e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}
