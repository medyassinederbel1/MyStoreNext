'use client'

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import CartTable from './CartTable'
import ProductShopCard from '@/components/shop/ProductShopCard'
import { useAsync } from '@/hooks/useAsync'
import { getProducts } from '@/api/products'
import { loadCart } from '@/store/cartSlice'
import type { RootState, AppDispatch } from '@/store'

export default function CartContent() {
  const dispatch = useDispatch<AppDispatch>()
  const { cart, cartId, loading } = useSelector((s: RootState) => s.cart)

  useEffect(() => {
    if (cartId && !cart) {
      void dispatch(loadCart(cartId))
    }
  }, [cartId, cart, dispatch])

  const isEmpty = !cart || cart.items.length === 0

  const { data: suggestedData } = useAsync(
    () => getProducts({ isTopSeller: true, _limit: 4 }),
    [],
    { throwOnError: false },
  )
  const suggested = suggestedData?.products ?? []

  return (
    <>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>Mon Panier</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-content-right">
                <div className="woocommerce">

                  {loading && (
                    <div style={{ padding: '60px 0', textAlign: 'center' }}>
                      <i className="fa fa-spinner fa-spin fa-3x" style={{ color: '#e84c3d' }} aria-hidden="true" />
                      <p style={{ marginTop: 12, color: '#888' }}>Chargement du panier…</p>
                    </div>
                  )}

                  {!loading && isEmpty && (
                    <div style={{ padding: '60px 0', textAlign: 'center' }}>
                      <i
                        className="fa fa-shopping-cart fa-3x"
                        style={{ color: '#ccc', marginBottom: 16, display: 'block' }}
                        aria-hidden="true"
                      />
                      <p style={{ color: '#888', fontSize: 18, marginBottom: 20 }}>
                        Votre panier est vide.
                      </p>
                      <Link href="/shop" className="add_to_cart_button" style={{ display: 'inline-block' }}>
                        Continuer mes achats
                      </Link>
                    </div>
                  )}

                  {!loading && !isEmpty && cart && <CartTable cart={cart} />}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {suggested.length > 0 && (
        <section className="product-area" style={{ padding: '40px 0 20px' }} aria-label="Produits suggérés">
          <div className="zigzag-bottom" />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="area-heading" style={{ marginBottom: 24 }}>
                  <h2 style={{ borderBottom: '2px solid #e8e8e8', paddingBottom: 12 }}>
                    <i className="fa fa-star" style={{ color: '#f0ad4e', marginRight: 8 }} aria-hidden="true" />
                    Vous pourriez aussi aimer…
                  </h2>
                </div>
              </div>
              {suggested.map((p) => (
                <div key={p.id} className="col-md-3 col-sm-6">
                  <ProductShopCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
