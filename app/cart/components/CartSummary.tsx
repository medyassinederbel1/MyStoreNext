interface Props {
  subtotal: number
  tax: number
  total: number
}

export default function CartSummary({ subtotal, tax, total }: Props) {
  return (
    <aside className="cart_totals" aria-label="Récapitulatif de la commande">
      <h2>Récapitulatif</h2>
      <table cellSpacing={0}>
        <tbody>
          <tr className="cart-subtotal">
            <th>Sous-total</th>
            <td><span className="amount">{subtotal.toFixed(2)} €</span></td>
          </tr>
          <tr className="shipping">
            <th>TVA (20%)</th>
            <td>{tax.toFixed(2)} €</td>
          </tr>
          <tr className="order-total">
            <th>Total</th>
            <td>
              <strong>
                <span className="amount">{total.toFixed(2)} €</span>
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </aside>
  )
}
