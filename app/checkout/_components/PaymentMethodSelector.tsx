'use client'

import Image from 'next/image'
import type React from 'react'
import type { PaymentMethod } from '@/types'
import { PAYMENT_METHODS } from '@/utils/constants'

interface BacsFields { accountName: string; iban: string; bic: string }
interface ChequeFields { nameOnCheque: string; chequeNumber: string }
interface PaypalFields { paypalEmail: string }

interface Props {
  paymentMethod: PaymentMethod
  setPaymentMethod: (m: PaymentMethod) => void
  bacs: BacsFields
  setBacs: (v: BacsFields) => void
  cheque: ChequeFields
  setCheque: (v: ChequeFields) => void
  paypal: PaypalFields
  setPaypal: (v: PaypalFields) => void
  fieldErrors: Record<string, string>
  setFieldErrors: (v: Record<string, string>) => void
}

const boxStyle: React.CSSProperties = {
  background: '#f9f9f9',
  border: '1px solid #e5e5e5',
  borderRadius: 4,
  padding: '14px 16px',
  marginTop: 8,
}
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  border: '1px solid #ccc',
  borderRadius: 3,
  fontSize: 13,
  boxSizing: 'border-box',
}

function Field({
  label,
  id,
  input,
  err,
}: {
  label: string
  id: string
  input: React.ReactNode
  err?: string
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label
        htmlFor={id}
        style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#444' }}
      >
        {label}
      </label>
      {input}
      {err && (
        <span style={{ color: '#e84c3d', fontSize: 11, marginTop: 2, display: 'block' }}>
          {err}
        </span>
      )}
    </div>
  )
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  bacs,
  setBacs,
  cheque,
  setCheque,
  paypal,
  setPaypal,
  fieldErrors,
  setFieldErrors,
}: Props) {
  return (
    <ul className="payment_methods methods" style={{ listStyle: 'none', padding: 0 }}>
      {PAYMENT_METHODS.map((pm) => (
        <li key={pm.value} className={`payment_method_${pm.value}`} style={{ marginBottom: 10 }}>
          <input
            type="radio"
            className="input-radio"
            id={`payment_method_${pm.value}`}
            name="payment_method"
            value={pm.value}
            checked={paymentMethod === pm.value}
            onChange={() => {
              setPaymentMethod(pm.value as PaymentMethod)
              setFieldErrors({})
            }}
          />
          <label
            htmlFor={`payment_method_${pm.value}`}
            style={{ marginLeft: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            {pm.label}
          </label>

          {paymentMethod === 'bacs' && pm.value === 'bacs' && (
            <div className="payment_box" style={boxStyle}>
              <p style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
                Effectuez votre virement en utilisant les informations ci-dessous.
              </p>
              <Field
                label="Nom du titulaire *"
                id="accountName"
                err={fieldErrors.accountName}
                input={
                  <input
                    style={inputStyle}
                    value={bacs.accountName}
                    maxLength={80}
                    onChange={(e) => setBacs({ ...bacs, accountName: e.target.value })}
                  />
                }
              />
              <Field
                label="IBAN *"
                id="iban"
                err={fieldErrors.iban}
                input={
                  <input
                    style={inputStyle}
                    placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                    value={bacs.iban}
                    maxLength={42}
                    onChange={(e) => setBacs({ ...bacs, iban: e.target.value })}
                  />
                }
              />
              <Field
                label="BIC / SWIFT *"
                id="bic"
                err={fieldErrors.bic}
                input={
                  <input
                    style={inputStyle}
                    placeholder="BNPAFRPP"
                    value={bacs.bic}
                    maxLength={11}
                    onChange={(e) => setBacs({ ...bacs, bic: e.target.value })}
                  />
                }
              />
            </div>
          )}

          {paymentMethod === 'cheque' && pm.value === 'cheque' && (
            <div className="payment_box" style={boxStyle}>
              <p style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
                Envoyez votre chèque à :{' '}
                <strong>MyStore, 12 Rue du Commerce, 75015 Paris</strong>.
              </p>
              <Field
                label="Nom sur le chèque *"
                id="nameOnCheque"
                err={fieldErrors.nameOnCheque}
                input={
                  <input
                    style={inputStyle}
                    value={cheque.nameOnCheque}
                    maxLength={80}
                    onChange={(e) => setCheque({ ...cheque, nameOnCheque: e.target.value })}
                  />
                }
              />
              <Field
                label="Numéro de chèque (optionnel)"
                id="chequeNumber"
                input={
                  <input
                    style={inputStyle}
                    placeholder="ex: 0012345"
                    value={cheque.chequeNumber}
                    maxLength={20}
                    onChange={(e) => setCheque({ ...cheque, chequeNumber: e.target.value })}
                  />
                }
              />
            </div>
          )}

          {paymentMethod === 'paypal' && pm.value === 'paypal' && (
            <div className="payment_box" style={boxStyle}>
              <p style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
                Entrez votre adresse PayPal pour finaliser votre commande.
              </p>
              <Field
                label="Email PayPal *"
                id="paypalEmail"
                err={fieldErrors.paypalEmail}
                input={
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="exemple@paypal.com"
                    value={paypal.paypalEmail}
                    maxLength={254}
                    onChange={(e) => setPaypal({ paypalEmail: e.target.value })}
                  />
                }
              />
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <Image
                  src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"
                  alt="PayPal"
                  width={300}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
