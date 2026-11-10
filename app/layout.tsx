import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const siteUrl = 'https://www.airnex.com.br'
const title = 'AirNex | Soluções DJI Enterprise'
const description = 'Implantação, capacitação e suporte para soluções DJI Enterprise: Dock, Matrice e softwares. Do drone à operação.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'AirNex',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'AirNex — Do drone à operação' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icon-192.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#11161c',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AirNex',
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  description,
  areaServed: 'BR',
  sameAs: ['https://www.instagram.com/airnexsolutions/'],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: '+55-11-99190-8358', availableLanguage: 'pt-BR' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sans.variable}>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <noscript><style>{'.reveal{clip-path:none!important}.reveal img{transform:none!important}'}</style></noscript>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  )
}
