'use client'

import { useState } from 'react'
import { z } from 'zod'
import { schemas } from '@/utils/validators'
import type { CheckoutAddress } from '@/types'
import AddressFields from './AddressFields'

interface Props {
  onNext: (billing: CheckoutAddress, shipping: CheckoutAddress | null, note: string) => void
}

const emptyAddress = (): CheckoutAddress => ({
  civility: '',
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  city: '',
  county: '',
  zipCode: '',
  email: '',
  phone: '',
})

type AddressErrors = Partial<Record<keyof CheckoutAddress, string>>

const countySchema = z.string().trim().min(1, 'Région / département requis')

const checkoutAddressSchema = (requireContact: boolean) =>
  z.object({
    civility: z.string().min(1, 'Ce champ est requis'),
    firstName: schemas.name,
    lastName: schemas.name,
    companyName: z.string().optional(),
    street: schemas.addressLine,
    city: schemas.city,
    county: countySchema,
    zipCode: schemas.zip,
    email: requireContact ? schemas.email : z.string().optional(),
    phone: requireContact ? schemas.phone : z.string().optional(),
  })

function validateCheckoutAddress(addr: CheckoutAddress, requireContact: boolean): AddressErrors {
  const result = checkoutAddressSchema(requireContact).safeParse(addr)
  if (result.success) return {}
  return Object.fromEntries(
    result.error.issues.map((issue) => [issue.path[0], issue.message]),
  ) as AddressErrors
}

function hasErrors(errs: AddressErrors): boolean {
  return Object.values(errs).some((v) => !!v)
}

export default function Step1Address({ onNext }: Props) {
  const [billing, setBilling] = useState<CheckoutAddress>(emptyAddress)
  const [shipToDifferent, setShipToDifferent] = useState(false)
  const [shipping, setShipping] = useState<CheckoutAddress>(emptyAddress)
  const [note, setNote] = useState('')
  const [billingErrors, setBillingErrors] = useState<AddressErrors>({})
  const [shippingErrors, setShippingErrors] = useState<AddressErrors>({})

  const updateBilling = (field: keyof CheckoutAddress, value: string) =>
    setBilling((prev) => ({ ...prev, [field]: value }))
  const updateShipping = (field: keyof CheckoutAddress, value: string) =>
    setShipping((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const bErrs = validateCheckoutAddress(billing, true)
    setBillingErrors(bErrs)
    if (hasErrors(bErrs)) return

    if (shipToDifferent) {
      const sErrs = validateCheckoutAddress(shipping, false)
      setShippingErrors(sErrs)
      if (hasErrors(sErrs)) return
    }

    onNext(billing, shipToDifferent ? shipping : null, note)
  }

  return (
    <form encType="multipart/form-data" className="checkout" onSubmit={handleSubmit} noValidate>
      <div id="customer_details" className="col2-set">
        <div className="col-6">
          <div className="woocommerce-billing-fields">
            <h3>Adresse de facturation</h3>
            <AddressFields
              prefix="billing"
              data={billing}
              onChange={updateBilling}
              errors={billingErrors}
              showContactFields
            />
          </div>
        </div>

        <div className="col-6">
          <div className="woocommerce-shipping-fields">
            <h3 id="ship-to-different-address">
              <label className="checkbox" htmlFor="ship-to-different-address-checkbox">
                Livrer à une adresse différente ?
              </label>
              <input
                type="checkbox"
                id="ship-to-different-address-checkbox"
                className="input-checkbox"
                checked={shipToDifferent}
                onChange={(e) => setShipToDifferent(e.target.checked)}
              />
            </h3>

            {shipToDifferent && (
              <div className="shipping_address" style={{ display: 'block' }}>
                <AddressFields
                  prefix="shipping"
                  data={shipping}
                  onChange={updateShipping}
                  errors={shippingErrors}
                />
              </div>
            )}

            <div className="woocommerce-additional-fields" style={{ marginTop: 24 }}>
              <h3>Informations complémentaires</h3>
              <p className="form-row notes">
                <label htmlFor="order_comments">Notes de commande</label>
                <textarea
                  id="order_comments"
                  className="input-text"
                  placeholder="Instructions spéciales pour la livraison, etc."
                  value={note}
                  maxLength={500}
                  rows={4}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row place-order" style={{ marginTop: 24 }}>
        <button type="submit" className="button alt checkout-button" id="place_order">
          Continuer vers le paiement →
        </button>
      </div>
    </form>
  )
}
