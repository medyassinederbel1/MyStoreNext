'use client'

import { useEffect, useState, useCallback } from 'react'
import { useCart } from '@/hooks/useCart'
import { isViewed } from '@/hooks/useViewedProducts'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductShopCardActions({ product }: Props) {
  const { cart, addItem, setQuantity, removeItem, loading } = useCart()
  const [viewed, setViewed] = useState(false)

  useEffect(() => {
    setViewed(isViewed(product.id))
  }, [product.id])

  const cartItem = cart?.items.find((i) => i.productId === product.id)
  const inCart = !!cartItem

  const handleAdd = useCallback(() => {
    addItem({
      productId: product.id,
      name: product.name,
      imageName: `${product.categoryName}/${product.imageName}`,
      price: product.price,
      quantity: 1,
    })
  }, [addItem, product])

  const handleDecrement = useCallback(() => {
    if (!cartItem) return
    if (cartItem.quantity <= 1) removeItem(product.id)
    else setQuantity(product.id, cartItem.quantity - 1)
  }, [cartItem, product.id, removeItem, setQuantity])

  const handleIncrement = useCallback(() => {
    if (!cartItem) return
    setQuantity(product.id, cartItem.quantity + 1)
  }, [cartItem, product.id, setQuantity])

  return (
    <>
      {viewed && (
        <span
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: '#1737c2',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: 12,
            zIndex: 2,
            letterSpacing: 0.5,
          }}
          aria-label="Produit déjà consulté"
        >
          Déjà vu
        </span>
      )}

      <div className="product-option-shop">
        {!product.inStock ? (
          <button
            className="add_to_cart_button"
            disabled
            aria-disabled="true"
            style={{ cursor: 'not-allowed', opacity: 0.6 }}
          >
            Rupture de stock
          </button>
        ) : inCart ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '2px solid #27ae60',
              borderRadius: 4,
              overflow: 'hidden',
            }}
            role="group"
            aria-label="Quantité dans le panier"
          >
            <button
              onClick={handleDecrement}
              disabled={loading}
              aria-label="Diminuer la quantité"
              style={{
                width: 26, height: 26, border: 'none',
                background: '#27ae60', color: '#fff',
                cursor: 'pointer', lineHeight: 1, padding: 0,
              }}
            >
              <i className="fa fa-minus" style={{ fontSize: 10 }} aria-hidden="true" />
            </button>
            <span
              style={{
                padding: '0 10px', fontWeight: 700, fontSize: 14,
                color: '#27ae60', minWidth: 28, textAlign: 'center',
              }}
              aria-live="polite"
            >
              {cartItem.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={loading}
              aria-label="Augmenter la quantité"
              style={{
                width: 26, height: 26, border: 'none',
                background: '#27ae60', color: '#fff',
                cursor: 'pointer', lineHeight: 1, padding: 0,
              }}
            >
              <i className="fa fa-plus" style={{ fontSize: 10 }} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            className="add_to_cart_button"
            onClick={handleAdd}
            disabled={loading}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {loading ? 'Ajout…' : 'Ajouter au panier'}
          </button>
        )}
      </div>
    </>
  )
}
