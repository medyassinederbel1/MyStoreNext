'use client'

import { useMemo } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import Link from 'next/link'
import type { Slide } from '@/types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Props {
  slides: Slide[]
}

export default function CarouselSlider({ slides }: Props) {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
    }),
    [],
  )

  return (
    <section aria-label="Diaporama promotionnel">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={slide.id}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '2.85 / 1' }}>
              <Image
                src={`/images/slides/${slide.image}`}
                alt={slide.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
              />
              <div className="caption-group">
                <div className="caption">
                  <h2 className="title">{slide.title}</h2>
                  <p className="subtitle">{slide.subtitle}</p>
                  <Link href={slide.link} className="button-radius primary">
                    <span>Acheter maintenant</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}
