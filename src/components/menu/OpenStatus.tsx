'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
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

export function OpenStatus() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [nextOpen, setNextOpen] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const findNextOpenTime = (schedule: Schedule, currentDate: Date) => {
    const days: (keyof Schedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const currentDayIndex = currentDate.getDay()

    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7
      const dayName = days[nextDayIndex]
      const daySchedule = schedule[dayName]

      if (!daySchedule.closed) {
        const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1)
        setNextOpen(`${dayNameCapitalized} ${formatTime(daySchedule.open)}`)
        return
      }
    }
  }

  const formatTime = (time: string) => {
    const [hour, min] = time.split(':').map(Number)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${min.toString().padStart(2, '0')} ${ampm}`
  }

  useEffect(() => {
    const checkOpenStatus = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('restaurant_settings')
        .select('value')
        .eq('key', 'schedule')
        .single()

      if (error || !data) {
        setLoading(false)
        return
      }

      const schedule = data.value as Schedule
      const now = new Date()
      const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()] as keyof Schedule
      const currentTime = now.getHours() * 60 + now.getMinutes()

      const todaySchedule = schedule[currentDay]

      if (todaySchedule.closed) {
        setIsOpen(false)
        findNextOpenTime(schedule, now)
      } else {
        const [openHour, openMin] = todaySchedule.open.split(':').map(Number)
        const [closeHour, closeMin] = todaySchedule.close.split(':').map(Number)
        const openTime = openHour * 60 + openMin
        let closeTime = closeHour * 60 + closeMin

        // Handle past-midnight closing times
        if (closeTime < openTime) {
          closeTime += 24 * 60
        }

        const isCurrentlyOpen = currentTime >= openTime && currentTime < closeTime

        setIsOpen(isCurrentlyOpen)

        if (!isCurrentlyOpen) {
          findNextOpenTime(schedule, now)
        }
      }

      setLoading(false)
    }

    checkOpenStatus()
    // Recheck every minute
    const interval = setInterval(checkOpenStatus, 60000)
    return () => clearInterval(interval)
  }, [findNextOpenTime])

  if (loading) {
    return (
      <Badge variant="secondary" className="gap-1.5 px-3">
        <Clock className="h-3 w-3" />
        <span className="text-xs font-medium">Loading...</span>
      </Badge>
    )
  }

  if (isOpen === null) {
    return null
  }

  return (
    <Badge
      variant={isOpen ? 'default' : 'secondary'}
      className={`gap-1.5 px-3 ${
        isOpen
          ? 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20'
          : 'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20'
      }`}
    >
      <Clock className="h-3 w-3" />
      <span className="text-xs font-medium">
        {isOpen ? 'Abierto' : 'Cerrado'}
      </span>
      {!isOpen && nextOpen && (
        <span className="text-xs opacity-70">• {nextOpen}</span>
      )}
    </Badge>
  )
}
