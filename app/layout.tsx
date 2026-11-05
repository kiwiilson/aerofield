import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.airnex.com.br'),
  alternates: { canonical: '/' },
  title: 'AirNex | Soluções DJI Enterprise',
  openGraph: {
    title: 'AirNex | Soluções DJI Enterprise',
    description: 'Consultoria, capacitação e implantação para soluções DJI Enterprise.',
    url: 'https://www.airnex.com.br',
    siteName: 'AirNex',
    locale: 'pt_BR',
    type: 'website',
  },
  description: 'Consultoria, capacitação e implantação para soluções DJI Enterprise.',
  icons: {
    icon: '/logo2.png/',
    shortcut: '/logo2.png',
    apple: '/logo2.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
