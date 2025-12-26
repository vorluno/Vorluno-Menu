import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionTitle({ children, subtitle, align = 'center', className }: SectionTitleProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align]

  return (
    <div className={cn('flex flex-col gap-3', alignClass, className)}>
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary">
        {children}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className={cn('h-1 w-20 bg-accent rounded-full', align === 'left' ? 'mr-auto' : align === 'right' ? 'ml-auto' : 'mx-auto')} />
    </div>
  )
}
