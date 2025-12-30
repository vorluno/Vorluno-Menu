'use client'

import { useTranslations } from 'next-intl'
import { Instagram, Facebook, Phone, Mail } from 'lucide-react'
import { WeekSchedule } from './WeekSchedule'

export function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Decorative gold line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-accent" />
          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent" />
        </div>

        {/* Logo pequeño */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="relative h-8 w-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-primary opacity-20" />
              <div className="absolute inset-1.5 rounded-full border border-accent opacity-50" />
              <div className="absolute inset-3 rounded-full bg-accent" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-1">Tu Restaurante</h3>
          <p className="text-[10px] uppercase tracking-wide-luxury text-muted-foreground">Menú Digital</p>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <a
            href="#"
            className="h-10 w-10 rounded-full bg-primary/5 hover:bg-accent/10 flex items-center justify-center transition-luxury hover:scale-110 group"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-luxury" />
          </a>
          <a
            href="#"
            className="h-10 w-10 rounded-full bg-primary/5 hover:bg-accent/10 flex items-center justify-center transition-luxury hover:scale-110 group"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-luxury" />
          </a>
          <a
            href="tel:+1234567890"
            className="h-10 w-10 rounded-full bg-primary/5 hover:bg-accent/10 flex items-center justify-center transition-luxury hover:scale-110 group"
            aria-label="Phone"
          >
            <Phone className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-luxury" />
          </a>
          <a
            href="mailto:info@example.com"
            className="h-10 w-10 rounded-full bg-primary/5 hover:bg-accent/10 flex items-center justify-center transition-luxury hover:scale-110 group"
            aria-label="Email"
          >
            <Mail className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-luxury" />
          </a>
        </div>

        {/* Schedule */}
        <WeekSchedule />

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Tu Restaurante. {t('rights')}.
          </p>
          <p className="text-xs text-muted-foreground/70">
            {t('poweredBy')} •{' '}
            <a
              href="https://vorluno.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors underline decoration-accent/30 hover:decoration-accent"
            >
              vorluno.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
