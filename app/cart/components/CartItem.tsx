'use client'

import { memo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CartItem as CartItemType } from '@/types'
import { useCart } from '@/hooks/useCart'

interface Props {
  item: CartItemType
}

const CartItem = memo(function CartItem({ item }: Props) {
  const { removeItem, setQuantity } = useCart()
  const lineTotal = item.price * item.quantity

  const handleRemove = useCallback(() => removeItem(item.productId), [item.productId, removeItem])
  const handleDecrement = useCallback(
    () => setQuantity(item.productId, item.quantity - 1),
    [item.productId, item.quantity, setQuantity],
  )
  const handleIncrement = useCallback(
    () => setQuantity(item.productId, item.quantity + 1),
    [item.productId, item.quantity, setQuantity],
  )

  return (
    <tr className="cart_item">
      <td className="product-remove">
        <button
          title="Supprimer cet article"
          aria-label={`Supprimer ${item.name} du panier`}
          className="remove"
          onClick={handleRemove}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#f30b0b', fontWeight: 'bold' }}
        >
          ×
        </button>
      </td>

      <td className="product-thumbnail">
        <Link href={`/product/${item.productId}`}>
          <Image
            width={80}
            height={80}
            src={`/images/products/${item.imageName}`}
            alt={item.name}
            className="shop_thumbnail"
            loading="lazy"
            style={{ objectFit: 'cover', borderRadius: 4 }}
          />
        </Link>
      </td>

      <td className="product-name">
        <Link href={`/product/${item.productId}`}>{item.name}</Link>
      </td>

      <td className="product-price">
        <span className="amount">{item.price.toFixed(2)} €</span>
      </td>

      <td className="product-quantity">
        <div
          className="quantity buttons_added"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          role="group"
          aria-label="Quantité"
        >
          <button
            className="minus"
            onClick={handleDecrement}
            aria-label="Diminuer la quantité"
            style={{ width: 30, height: 30, border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer', borderRadius: 3 }}
          >
            <i className="fa fa-minus" aria-hidden="true" />
          </button>
          <input
            type="number"
            className="input-text qty text"
            value={item.quantity}
            min={1}
            aria-label="Quantité"
            onChange={(e) => {
              const v = parseInt(e.target.value, 10)
              if (!isNaN(v) && v >= 1) setQuantity(item.productId, v)
            }}
            style={{ width: 50, textAlign: 'center' }}
          />
          <button
            className="plus"
            onClick={handleIncrement}
            aria-label="Augmenter la quantité"
            style={{ width: 30, height: 30, border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer', borderRadius: 3 }}
          >
            <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </div>
      </td>

      <td className="product-subtotal">
        <span className="amount">{lineTotal.toFixed(2)} €</span>
      </td>
    </tr>
  )
})

export default CartItem
