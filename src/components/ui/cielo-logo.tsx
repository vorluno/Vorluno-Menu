import { cn } from '@/lib/utils'

interface CieloLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CieloLogo({ size = 'md', className }: CieloLogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Outer circle - primary */}
      <div className="absolute inset-0 rounded-full border-2 border-primary opacity-30 group-hover:opacity-50 transition-opacity" />

      {/* Middle circle - accent */}
      <div className="absolute inset-2 rounded-full border-2 border-accent opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Inner circle - solid accent */}
      <div className="absolute inset-4 rounded-full bg-accent group-hover:scale-110 transition-transform" />
    </div>
  )
}
