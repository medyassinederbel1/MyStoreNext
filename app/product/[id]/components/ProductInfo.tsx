import Link from 'next/link'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductInfo({ product }: Props) {
  const originalPrice = Math.round(product.price / (1 - product.discountRate / 100))

  return (
    <div className="product-inner">
      <h1 className="product-name" style={{ fontSize: 22 }}>{product.name}</h1>

      <div style={{ margin: '8px 0' }} aria-label={`Note : ${product.review.toFixed(1)} sur 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa fa-star${i < Math.round(product.review) ? '' : '-o'}`}
            style={{ color: '#f39c12', marginRight: 2 }}
            aria-hidden="true"
          />
        ))}
        <span style={{ color: '#888', fontSize: 13, marginLeft: 6 }}>
          ({product.review.toFixed(1)})
        </span>
      </div>

      <div className="product-inner-price">
        <ins>{product.price.toFixed(2)} €</ins>{' '}
        {product.discountRate > 0 && <del>{originalPrice.toFixed(2)} €</del>}
        {product.discountRate > 0 && (
          <span
            style={{
              background: '#e84c3d',
              color: '#fff',
              fontSize: 12,
              padding: '2px 6px',
              borderRadius: 3,
              marginLeft: 8,
            }}
            aria-label={`Réduction de ${product.discountRate}%`}
          >
            -{product.discountRate}%
          </span>
        )}
      </div>

      <div style={{ margin: '10px 0' }}>
        {product.inStock ? (
          <span style={{ color: '#27ae60', fontWeight: 600 }}>
            <i className="fa fa-check-circle" style={{ marginRight: 4 }} aria-hidden="true" />
            En stock
          </span>
        ) : (
          <span style={{ color: '#e84c3d', fontWeight: 600 }}>
            <i className="fa fa-times-circle" style={{ marginRight: 4 }} aria-hidden="true" />
            Rupture de stock
          </span>
        )}
      </div>

      <div className="product-inner-category">
        <p>
          <strong>Catégorie :</strong>{' '}
          <Link href={`/shop/${product.categoryId}`}>{product.categoryName}</Link>
        </p>
        <p>
          <strong>Type :</strong> {product.type}
        </p>
      </div>
    </div>
  )
}
