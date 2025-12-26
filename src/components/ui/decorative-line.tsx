import { cn } from '@/lib/utils'

interface DecorativeLineProps {
  variant?: 'horizontal' | 'vertical' | 'with-dot'
  className?: string
}

export function DecorativeLine({ variant = 'horizontal', className }: DecorativeLineProps) {
  if (variant === 'with-dot') {
    return (
      <div className={cn('flex items-center justify-center gap-4', className)}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
        <div className="h-2 w-2 rounded-full bg-accent" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
      </div>
    )
  }

  if (variant === 'vertical') {
    return <div className={cn('w-px h-full bg-accent/50', className)} />
  }

  return <div className={cn('h-px w-full bg-accent/50', className)} />
}
