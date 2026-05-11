import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import ProductShopCardActions from './ProductShopCardActions'

interface Props {
  product: Product
}

export default function ProductShopCard({ product }: Props) {
  const originalPrice = product.discountRate > 0
    ? Math.round(product.price / (1 - product.discountRate / 100))
    : null
  const stars = Math.round(product.review)

  return (
    <article
      className="product-card"
      style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 28,
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)'
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', background: '#f8f9fb', padding: '16px 12px 0' }}>
        {/* Badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 5, zIndex: 2 }}>
          {product.isNewProduct && (
            <span style={{
              background: '#27ae60', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '2px 8px',
              borderRadius: 20, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>
              Nouveau
            </span>
          )}
          {product.isTopSeller && (
            <span style={{
              background: '#f39c12', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '2px 8px',
              borderRadius: 20, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>
              Top vente
            </span>
          )}
          {!product.inStock && (
            <span style={{
              background: '#95a5a6', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '2px 8px',
              borderRadius: 20, letterSpacing: 0.5, textTransform: 'uppercase',
            }}>
              Épuisé
            </span>
          )}
        </div>

        {product.discountRate > 0 && (
          <span style={{
            position: 'absolute', top: 10, right: 10,
            background: '#e84c3d', color: '#fff',
            fontSize: 11, fontWeight: 700, padding: '3px 8px',
            borderRadius: 20, zIndex: 2,
          }}>
            -{product.discountRate}%
          </span>
        )}

        <Link href={`/product/${product.id}`} style={{ display: 'block', textAlign: 'center' }}>
          <Image
            src={`/images/products/${product.categoryName}/${product.imageName}`}
            alt={product.name}
            width={220}
            height={200}
            loading="lazy"
            style={{ objectFit: 'contain', width: '100%', height: 200 }}
          />
        </Link>
      </div>

      {/* Content area */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
          <div aria-label={`Note : ${product.review.toFixed(1)} sur 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className={`fa fa-star${i < stars ? '' : '-o'}`}
                style={{ color: '#f39c12', fontSize: 11 }}
                aria-hidden="true"
              />
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#aaa', marginLeft: 2 }}>
            ({product.review.toFixed(1)})
          </span>
        </div>

        {/* Name */}
        <h2 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 10px', lineHeight: 1.4, color: '#222', flex: 1 }}>
          <Link
            href={`/product/${product.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {product.name}
          </Link>
        </h2>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#5a88ca' }}>
            {product.price.toFixed(2)} €
          </span>
          {originalPrice !== null && (
            <del style={{ fontSize: 13, color: '#bbb', fontWeight: 400 }}>
              {originalPrice.toFixed(2)} €
            </del>
          )}
        </div>

        {/* Actions */}
        <ProductShopCardActions product={product} />
      </div>
    </article>
  )
}
