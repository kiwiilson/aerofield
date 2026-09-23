import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aero Field | DJI Enterprise Enablement',
  description: 'Capacitação, canais e projetos para o ecossistema DJI Enterprise no Brasil.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
