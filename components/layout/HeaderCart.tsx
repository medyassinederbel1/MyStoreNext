'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/hooks/useCart'

export default function HeaderCart() {
  const { itemCount, cart } = useCart()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (pathname === '/cart' || pathname === '/checkout') return null

  const total = mounted ? (cart?.total ?? 0) : 0
  const count = mounted ? itemCount : 0

  return (
    <div className="shopping-item">
      <Link href="/cart" aria-label={`Panier — ${count} article(s) — ${total.toFixed(2)} €`}>
        Panier : <span className="cart-amunt">{total.toFixed(2)} €</span>{' '}
        <i className="fa fa-shopping-cart" aria-hidden="true" />{' '}
        <span className="product-count">{count}</span>
      </Link>
    </div>
  )
}
