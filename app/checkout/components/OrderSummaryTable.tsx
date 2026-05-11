import type { Cart } from '@/types'

interface Props {
  cart: Cart
}

export default function OrderSummaryTable({ cart }: Props) {
  return (
    <table className="shop_table" style={{ marginBottom: 24 }} aria-label="Récapitulatif de la commande">
      <thead>
        <tr>
          <th className="product-name" scope="col">Produit</th>
          <th className="product-total" scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((item) => (
          <tr className="cart_item" key={item.productId}>
            <td className="product-name">
              {item.name}{' '}
              <strong className="product-quantity">× {item.quantity}</strong>
            </td>
            <td className="product-total">
              <span className="amount">{(item.price * item.quantity).toFixed(2)} €</span>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="cart-subtotal">
          <th scope="row">Sous-total</th>
          <td><span className="amount">{cart.subtotal.toFixed(2)} €</span></td>
        </tr>
        <tr className="shipping">
          <th scope="row">TVA (20%)</th>
          <td>{cart.tax.toFixed(2)} €</td>
        </tr>
        <tr className="order-total">
          <th scope="row">Total</th>
          <td>
            <strong><span className="amount">{cart.total.toFixed(2)} €</span></strong>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
