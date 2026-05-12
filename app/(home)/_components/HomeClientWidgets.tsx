import Link from 'next/link'
import type { Product } from '@/types'
import ProductWidgetCard from './ProductWidgetCard'

interface Props {
  topSellers: Product[]
}

export default function HomeWidgets({ topSellers }: Props) {
  return (
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
  )
}
