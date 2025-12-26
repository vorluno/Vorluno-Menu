import { Header } from '@/components/menu/Header'
import { Footer } from '@/components/menu/Footer'
import { InstallPWA } from '@/components/menu/InstallPWA'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <InstallPWA />
    </div>
  )
}
