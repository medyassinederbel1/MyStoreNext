'use client'

import { useState, useCallback } from 'react'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

interface Props {
  product: Product
}

const btnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  border: '1px solid #ccc',
  background: '#f5f5f5',
  cursor: 'pointer',
  borderRadius: 3,
}

export default function ProductAddToCartClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem, loading: cartLoading } = useCart()

  const handleAddToCart = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      addItem({
        productId: product.id,
        name: product.name,
        imageName: `${product.categoryName}/${product.imageName}`,
        price: product.price,
        quantity,
      })
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    },
    [addItem, product, quantity],
  )

  return (
    <form className="cart" onSubmit={handleAddToCart}>
      <div
        className="quantity"
        style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}
        role="group"
        aria-label="Quantité"
      >
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          aria-label="Diminuer la quantité"
          style={btnStyle}
        >
          <i className="fa fa-minus" aria-hidden="true" />
        </button>
        <input
          type="number"
          className="input-text qty text"
          value={quantity}
          min={1}
          aria-label="Quantité"
          onChange={(e) => {
            const v = parseInt(e.target.value, 10)
            if (!isNaN(v) && v >= 1) setQuantity(v)
          }}
          style={{ width: 52, textAlign: 'center' }}
        />
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Augmenter la quantité"
          style={btnStyle}
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
      </div>

      <button
        className="add_to_cart_button"
        type="submit"
        disabled={!product.inStock || cartLoading}
        style={{ opacity: !product.inStock ? 0.6 : 1 }}
        aria-label={`Ajouter ${product.name} au panier`}
      >
        {added ? (
          <>
            <i className="fa fa-check" style={{ marginRight: 6 }} aria-hidden="true" />
            Ajouté !
          </>
        ) : cartLoading ? (
          'Ajout en cours…'
        ) : product.inStock ? (
          'Ajouter au panier'
        ) : (
          'Rupture de stock'
        )}
      </button>
    </form>
  )
}
