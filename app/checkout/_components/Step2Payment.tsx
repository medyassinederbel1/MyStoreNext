'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import type { CheckoutAddress, PaymentMethod } from '@/types'
import type { RootState, AppDispatch } from '@/store'
import { deleteCart, resetCart } from '@/store/cartSlice'
import { postOrder } from '@/api/orders'
import OrderSummaryTable from './OrderSummaryTable'
import PaymentMethodSelector from './PaymentMethodSelector'
import {
  validateIban,
  validateBic,
  validateChequeName,
  validateEmail,
} from '@/utils/validators'

interface Props {
  billing: CheckoutAddress
  shipping: CheckoutAddress | null
  note: string
  onBack: () => void
}

export default function Step2Payment({ billing, shipping, note, onBack }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const { cart, cartId } = useSelector((s: RootState) => s.cart)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bacs')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<number | string | null>(null)
  const [bacs, setBacs] = useState({ accountName: '', iban: '', bic: '' })
  const [cheque, setCheque] = useState({ nameOnCheque: '', chequeNumber: '' })
  const [paypal, setPaypal] = useState({ paypalEmail: '' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  if (!cart || !cartId) return null

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (paymentMethod === 'bacs') {
      if (!bacs.accountName.trim()) errs.accountName = 'Ce champ est requis'
      const ibanErr = validateIban(bacs.iban)
      if (ibanErr) errs.iban = ibanErr
      const bicErr = validateBic(bacs.bic)
      if (bicErr) errs.bic = bicErr
    }
    if (paymentMethod === 'cheque') {
      const chequeNameErr = validateChequeName(cheque.nameOnCheque)
      if (chequeNameErr) errs.nameOnCheque = chequeNameErr
    }
    if (paymentMethod === 'paypal') {
      const emailErr = validateEmail(paypal.paypalEmail)
      if (emailErr) errs.paypalEmail = emailErr
    }
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePlaceOrder = async () => {
    if (!validate()) return
    setError(null)
    setSubmitting(true)
    try {
      const orderPayload = {
        total: cart.total,
        subTotal: cart.subtotal,
        tax: cart.tax,
        items: cart.items.map((i) => ({
          id: i.productId,
          name: i.name,
          imageName: i.imageName,
          price: i.price,
          qty: i.quantity,
        })),
        paymentMethod,
        customer: {
          email: billing.email,
          phone: billing.phone,
          note,
          billingAdress: {
            civility: billing.civility,
            firstName: billing.firstName,
            lastName: billing.lastName,
            zipCode: billing.zipCode,
            street: billing.street,
            companyName: billing.companyName,
            county: billing.county,
            city: billing.city,
          },
          ...(shipping
            ? {
                shippingAdress: {
                  civility: shipping.civility,
                  firstName: shipping.firstName,
                  lastName: shipping.lastName,
                  zipCode: shipping.zipCode,
                  street: shipping.street,
                  companyName: shipping.companyName,
                  county: shipping.county,
                  city: shipping.city,
                },
              }
            : {}),
        },
      }
      const order = await postOrder(orderPayload)
      await dispatch(deleteCart(cartId))
      dispatch(resetCart())
      setOrderId(order.id ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Une erreur est survenue.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderId !== null) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <i
          className="fa fa-check-circle fa-3x"
          style={{ color: '#27ae60', marginBottom: 16, display: 'block' }}
          aria-hidden="true"
        />
        <h3 style={{ color: '#27ae60' }}>Commande confirmée !</h3>
        <p style={{ color: '#555', marginTop: 8 }}>
          Merci pour votre achat. Votre commande n°{String(orderId)} a bien été enregistrée.
        </p>
        <Link
          href="/shop"
          className="add_to_cart_button"
          style={{ display: 'inline-block', marginTop: 16 }}
        >
          Continuer mes achats
        </Link>
      </div>
    )
  }

  return (
    <>
      <h3 id="order_review_heading" style={{ marginBottom: 16 }}>
        Récapitulatif de la commande
      </h3>
      <OrderSummaryTable cart={cart} />

      <div id="payment">
        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          bacs={bacs}
          setBacs={setBacs}
          cheque={cheque}
          setCheque={setCheque}
          paypal={paypal}
          setPaypal={setPaypal}
          fieldErrors={fieldErrors}
          setFieldErrors={setFieldErrors}
        />

        {error && (
          <div
            role="alert"
            style={{
              color: '#e84c3d',
              background: '#fdf3f2',
              border: '1px solid #f5c6cb',
              borderRadius: 4,
              padding: '10px 14px',
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button
            type="button"
            onClick={onBack}
            aria-label="Retour à l'adresse"
            style={{
              background: '#eee',
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            ← Retour
          </button>
          <button
            type="button"
            className="button alt checkout-button"
            onClick={handlePlaceOrder}
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? (
              <>
                <i className="fa fa-spinner fa-spin" style={{ marginRight: 6 }} aria-hidden="true" />
                Traitement en cours…
              </>
            ) : (
              'Passer la commande'
            )}
          </button>
        </div>
      </div>
    </>
  )
}
