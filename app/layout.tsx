import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aero Field',
  description: 'Consultoria, capacitação e implantação para soluções DJI Enterprise.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo-af.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
