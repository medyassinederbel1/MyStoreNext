'use client'

import dynamic from 'next/dynamic'
import type { Slide } from '@/types'

const CarouselSlider = dynamic(() => import('./CarouselSlider'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 350,
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Chargement du carousel"
    >
      <i className="fa fa-spinner fa-spin fa-2x" style={{ color: '#aaa' }} aria-hidden="true" />
    </div>
  ),
})

interface Props {
  slides: Slide[]
}

export default function Carousel({ slides }: Props) {
  if (slides.length === 0) return null
  return <CarouselSlider slides={slides} />
}
