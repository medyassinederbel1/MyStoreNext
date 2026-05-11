'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAsync } from '@/hooks/useAsync'
import { getProductById } from '@/api/products'
import { getLastViewedIds, markAsViewed } from '@/hooks/useViewedProducts'

interface Props {
  productId: number
}

export default function RecentlyViewedSidebarClient({ productId }: Props) {
  const [lastViewedIds, setLastViewedIds] = useState<number[]>([])

  useEffect(() => {
    markAsViewed(productId)
    setLastViewedIds(getLastViewedIds(5).filter((id) => id !== productId))
  }, [productId])

  const { data: recentlyViewed } = useAsync(
    () =>
      lastViewedIds.length > 0
        ? Promise.all(lastViewedIds.map((id) => getProductById(id)))
        : Promise.resolve([]),
    [lastViewedIds.join(',')],
    { throwOnError: false },
  )

  if (!recentlyViewed || recentlyViewed.length === 0) return null

  return (
    <aside className="single-sidebar" aria-label="Récemment consultés">
      <h2 className="sidebar-title">Récemment consultés</h2>
      {recentlyViewed.map((sp) => {
        const originalPrice = Math.round(sp.price / (1 - sp.discountRate / 100))
        return (
          <div className="thubmnail-recent" key={sp.id}>
            <Link href={`/product/${sp.id}`}>
              <Image
                src={`/images/products/${sp.categoryName}/${sp.imageName}`}
                className="recent-thumb"
                alt={sp.name}
                width={80}
                height={80}
                loading="lazy"
                style={{ objectFit: 'contain' }}
              />
            </Link>
            <h2>
              <Link href={`/product/${sp.id}`}>{sp.name}</Link>
            </h2>
            <div className="product-sidebar-price">
              <ins>{sp.price.toFixed(2)} €</ins>{' '}
              {sp.discountRate > 0 && <del>{originalPrice.toFixed(2)} €</del>}
            </div>
          </div>
        )
      })}
    </aside>
  )
}
