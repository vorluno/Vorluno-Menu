'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Clock } from 'lucide-react'

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

export function WeekSchedule() {
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchedule = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('restaurant_settings')
        .select('value')
        .eq('key', 'schedule')
        .single()

      if (data && !error) {
        setSchedule(data.value as Schedule)
      }
      setLoading(false)
    }

    fetchSchedule()
  }, [])

  const formatTime = (time: string) => {
    const [hour, min] = time.split(':').map(Number)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${min.toString().padStart(2, '0')} ${ampm}`
  }

  const getDayLabel = (day: string) => {
    const labels: Record<string, string> = {
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mié',
      thursday: 'Jue',
      friday: 'Vie',
      saturday: 'Sáb',
      sunday: 'Dom'
    }
    return labels[day] || day
  }

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[new Date().getDay()]
  }

  if (loading || !schedule) {
    return null
  }

  const currentDay = getCurrentDay()

  return (
    <div className="border-t border-border/50 pt-8 mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">Horarios</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-3xl mx-auto text-sm">
        {(Object.keys(schedule) as Array<keyof Schedule>).map((day) => {
          const daySchedule = schedule[day]
          const isToday = day === currentDay

          return (
            <div
              key={day}
              className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                isToday
                  ? 'bg-accent/10 text-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              <span className="font-medium">{getDayLabel(day)}</span>
              <span className="text-xs">
                {daySchedule.closed
                  ? 'Cerrado'
                  : `${formatTime(daySchedule.open)} - ${formatTime(daySchedule.close)}`}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
