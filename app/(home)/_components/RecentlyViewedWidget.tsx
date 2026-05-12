'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLastViewedIds } from '@/hooks/useViewedProducts'
import { getProductById } from '@/api/products'
import ProductWidgetCard from './ProductWidgetCard'
import type { Product } from '@/types'

export default function RecentlyViewedWidget() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const ids = getLastViewedIds(5)
    if (ids.length === 0) return
    Promise.all(ids.map((id) => getProductById(id)))
      .then(setProducts)
      .catch(() => {})
  }, [])

  if (products.length === 0) return null

  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        <h2 className="product-wid-title">Récemment consultés</h2>
        <Link href="/shop?recentlyViewed=true" className="btn btn-link p-0">
          Voir tout
        </Link>
        {products.map((p) => (
          <ProductWidgetCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
