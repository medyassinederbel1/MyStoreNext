import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from '@/providers/Providers'

export const metadata: Metadata = {
  title: {
    default: 'MyStore — Smartphones & Accessoires',
    template: '%s | MyStore',
  },
  description:
    'Boutique en ligne spécialisée dans la vente de smartphones, tablettes et montres connectées aux meilleurs prix.',
  keywords: ['smartphone', 'téléphone', 'tablette', 'montre connectée', 'boutique en ligne'],
  authors: [{ name: 'MyStore' }],
  creator: 'MyStore',
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'MyStore',
    title: 'MyStore — Smartphones & Accessoires',
    description: 'Boutique en ligne spécialisée dans la vente de smartphones, tablettes et montres connectées.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
