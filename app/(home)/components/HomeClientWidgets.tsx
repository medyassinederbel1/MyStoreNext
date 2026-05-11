'use client'

import Link from 'next/link'
import { useAsync } from '@/hooks/useAsync'
import { getProducts, getProductById } from '@/api/products'
import { getLastViewedIds } from '@/hooks/useViewedProducts'
import ProductWidgetCard from './ProductWidgetCard'

export default function HomeClientWidgets() {
  const { data: topSellersData } = useAsync(
    () => getProducts({ isTopSeller: true }),
    [],
    { throwOnError: false },
  )
  const topSellers = topSellersData?.products ?? []

  const lastViewedIds = getLastViewedIds(3)
  const { data: recentlyViewedData } = useAsync(
    () =>
      lastViewedIds.length > 0
        ? Promise.all(lastViewedIds.map((id) => getProductById(id)))
        : Promise.resolve([]),
    [lastViewedIds.join(',')],
    { throwOnError: false },
  )
  const recentlyViewed = recentlyViewedData ?? []

  return (
    <>
      <div className="col-md-4">
        <div className="single-product-widget">
          <h2 className="product-wid-title">Meilleures ventes</h2>
          <Link href="/shop?isTopSeller=true" className="btn btn-link p-0">
            Voir tout
          </Link>
          {topSellers.map((p) => (
            <ProductWidgetCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {recentlyViewed.length > 0 && (
        <div className="col-md-4">
          <div className="single-product-widget">
            <h2 className="product-wid-title">Récemment consultés</h2>
            <Link href="/shop?recentlyViewed=true" className="btn btn-link p-0">
              Voir tout
            </Link>
            {recentlyViewed.map((p) => (
              <ProductWidgetCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
