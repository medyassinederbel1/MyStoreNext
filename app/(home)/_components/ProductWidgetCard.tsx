import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductWidgetCard({ product }: Props) {
  const originalPrice = Math.round(product.price / (1 - product.discountRate / 100))

  return (
    <article className="single-wid-product">
      <Link href={`/product/${product.id}`}>
        <Image
          src={`/images/products/${product.categoryName}/${product.imageName}`}
          alt={product.name}
          className="product-thumb"
          width={60}
          height={60}
          loading="lazy"
          style={{ objectFit: 'contain' }}
        />
      </Link>
      <h2>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </h2>
      <div className="product-wid-rating" aria-label={`Note : ${product.review.toFixed(1)}/5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa fa-star${i < Math.round(product.review) ? '' : '-o'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="product-wid-price">
        <ins>{product.price.toFixed(2)} €</ins>{' '}
        {product.discountRate > 0 && <del>{originalPrice.toFixed(2)} €</del>}
      </div>
    </article>
  )
}
