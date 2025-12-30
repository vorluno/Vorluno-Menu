'use client'

import { useLocale } from 'next-intl'
import { PRODUCT_TAGS, TAG_COLORS, type ProductTag } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TagBadgeProps {
  tag: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function TagBadge({ tag, showLabel = true, size = 'sm' }: TagBadgeProps) {
  const locale = useLocale()

  if (!(tag in PRODUCT_TAGS)) {
    return null
  }

  const tagData = PRODUCT_TAGS[tag as ProductTag]
  const label = locale === 'es' ? tagData.label_es : tagData.label_en
  const colorClass = TAG_COLORS[tagData.color]

  const content = (
    <Badge
      variant="secondary"
      className={`gap-1 ${colorClass} ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
    >
      <span>{tagData.icon}</span>
      {showLabel && <span className="font-medium">{label}</span>}
    </Badge>
  )

  if (!showLabel) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}
