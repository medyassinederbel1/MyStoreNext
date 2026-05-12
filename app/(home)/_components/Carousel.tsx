'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import type { Slide } from '@/types'

const CarouselSlider = dynamic(() => import('./CarouselSlider'), {
  ssr: false,
  loading: () => <CarouselFallback />,
})

function CarouselFallback() {
  return (
    <div
      style={{
        height: 350,
        background: 'linear-gradient(135deg, #1a1a2e 0%, #e84c3d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <span style={{ color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
        MyStore
      </span>
      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
        Smartphones · Tablettes · Montres
      </span>
    </div>
  )
}

interface Props {
  slides: Slide[]
}

export default function Carousel({ slides }: Props) {
  if (slides.length === 0) return null
  return (
    <>
      {/* Visible uniquement sans JavaScript — première slide statique */}
      <noscript>
        <section aria-label="Diaporama promotionnel">
          <div style={{ position: 'relative', width: '100%', aspectRatio: '2.85 / 1' }}>
            <Image
              src={`/images/slides/${slides[0].image}`}
              alt={slides[0].title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="caption-group">
              <div className="caption">
                <h2 className="title">{slides[0].title}</h2>
                <p className="subtitle">{slides[0].subtitle}</p>
                <Link href={slides[0].link} className="button-radius primary">
                  <span>Acheter maintenant</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </noscript>
      {/* Carousel interactif avec JavaScript */}
      <CarouselSlider slides={slides} />
    </>
  )
}
