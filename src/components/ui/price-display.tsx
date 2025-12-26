import { cn } from '@/lib/utils'

interface PriceDisplayProps {
  price: number
  priceAlt?: number | null
  priceAltLabel?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceDisplay({
  price,
  priceAlt,
  priceAltLabel,
  size = 'md',
  className
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: {
      price: 'text-lg',
      label: 'text-xs',
      symbol: 'text-base'
    },
    md: {
      price: 'text-xl',
      label: 'text-xs',
      symbol: 'text-lg'
    },
    lg: {
      price: 'text-2xl',
      label: 'text-sm',
      symbol: 'text-xl'
    }
  }

  const sizes = sizeClasses[size]

  if (priceAlt && priceAltLabel) {
    return (
      <div className={cn('flex items-center justify-between gap-4 pt-2 border-t border-border/50', className)}>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {priceAltLabel}
          </span>
          <span className={cn('font-semibold', sizes.price)}>
            <span className="text-accent">{sizes.symbol}</span>
            <span className="text-foreground">{priceAlt.toFixed(2)}</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {priceAltLabel === 'Copa' || priceAltLabel === 'Glass' ? 'Botella / Bottle' : 'Botella'}
          </span>
          <span className={cn('font-semibold', sizes.price)}>
            <span className="text-accent">$</span>
            <span className="text-foreground">{price.toFixed(2)}</span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-end', className)}>
      <span className={cn('font-bold', sizes.price)}>
        <span className="text-accent">$</span>
        <span className="text-foreground">{price.toFixed(2)}</span>
      </span>
    </div>
  )
}
