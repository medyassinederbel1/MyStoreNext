'use client'

import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { createCart, updateCart, deleteCart, resetCart } from '@/store/cartSlice'
import type { CartItem } from '@/types'

export function useCart() {
  const dispatch = useDispatch<AppDispatch>()
  const { cart, cartId, loading } = useSelector((s: RootState) => s.cart)

  const itemCount = useMemo(
    () => cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
    [cart?.items],
  )

  const addItem = useCallback(
    (item: CartItem) => {
      if (!cartId || !cart) {
        void dispatch(createCart([item]))
        return
      }
      const existing = cart.items.find((i) => i.productId === item.productId)
      const updatedItems = existing
        ? cart.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          )
        : [...cart.items, item]
      void dispatch(updateCart({ cartId, items: updatedItems }))
    },
    [cart, cartId, dispatch],
  )

  const removeItem = useCallback(
    (productId: number) => {
      if (!cart || !cartId) return
      const updatedItems = cart.items.filter((i) => i.productId !== productId)
      void dispatch(updateCart({ cartId, items: updatedItems }))
    },
    [cart, cartId, dispatch],
  )

  const setQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (!cart || !cartId) return
      if (quantity <= 0) { removeItem(productId); return }
      const updatedItems = cart.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      )
      void dispatch(updateCart({ cartId, items: updatedItems }))
    },
    [cart, cartId, dispatch, removeItem],
  )

  const clearCart = useCallback(() => {
    if (cartId) void dispatch(deleteCart(cartId))
    dispatch(resetCart())
  }, [cartId, dispatch])

  return { cart, cartId, itemCount, loading, addItem, removeItem, setQuantity, clearCart }
}
