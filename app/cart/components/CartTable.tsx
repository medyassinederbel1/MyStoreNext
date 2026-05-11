'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import type { Cart } from '@/types'

interface Props {
  cart: Cart
}

export default function CartTable({ cart }: Props) {
  const router = useRouter()

  return (
    <>
      <table cellSpacing={0} className="shop_table cart" aria-label="Articles du panier">
        <thead>
          <tr>
            <th className="product-remove" scope="col"><span className="sr-only">Supprimer</span></th>
            <th className="product-thumbnail" scope="col"><span className="sr-only">Image</span></th>
            <th className="product-name" scope="col">Produit</th>
            <th className="product-price" scope="col">Prix</th>
            <th className="product-quantity" scope="col">Quantité</th>
            <th className="product-subtotal" scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
          <tr>
            <td className="actions" colSpan={6}>
              <button
                className="checkout-button button alt wc-forward"
                onClick={() => router.push('/checkout')}
                style={{ float: 'right' }}
              >
                Passer la commande
              </button>
              <Link
                href="/shop"
                style={{ color: '#555', textDecoration: 'underline', lineHeight: '38px' }}
              >
                Continuer mes achats
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="cart-collaterals">
        <CartSummary subtotal={cart.subtotal} tax={cart.tax} total={cart.total} />
      </div>
    </>
  )
}
