'use client'

import { useEffect, type ReactNode } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store'
import type { AppDispatch } from '@/store'
import { loadCart } from '@/store/cartSlice'

function CartInitializer() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId')
    if (storedCartId) {
      void dispatch(loadCart(storedCartId))
    }
  }, [dispatch])

  return null
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CartInitializer />
      {children}
    </Provider>
  )
}
