'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CieloLogo } from '@/components/ui/cielo-logo'
import { useState, useEffect } from 'react'

export function Header() {
  const t = useTranslations('header')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/98 backdrop-blur-xl shadow-luxury border-b border-border/80'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo CIELO */}
          <Link href="/" className="group flex items-center gap-3 transition-all hover:scale-[1.02]">
            <CieloLogo size={isScrolled ? 'sm' : 'md'} />

            {/* Text */}
            <div className="flex flex-col items-start">
              <span className={`font-serif font-bold text-primary tracking-tight leading-none transition-all ${
                isScrolled ? 'text-2xl' : 'text-3xl'
              }`}>
                {t('title')}
              </span>
              <span className={`uppercase tracking-wide-luxury text-muted-foreground font-sans transition-all ${
                isScrolled ? 'text-[8px]' : 'text-[10px]'
              }`}>
                {t('subtitle')}
              </span>
            </div>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
