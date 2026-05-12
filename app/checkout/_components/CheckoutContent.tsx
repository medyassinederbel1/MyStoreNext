'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Step1Address from './Step1Address'
import Step2Payment from './Step2Payment'
import CheckoutStepper from './CheckoutStepper'
import type { RootState } from '@/store'
import type { CheckoutAddress } from '@/types'

export default function CheckoutContent() {
  const [step, setStep] = useState<1 | 2>(1)
  const [billing, setBilling] = useState<CheckoutAddress | null>(null)
  const [shipping, setShipping] = useState<CheckoutAddress | null>(null)
  const [note, setNote] = useState('')
  const { cart } = useSelector((s: RootState) => s.cart)

  const isEmpty = !cart || cart.items.length === 0

  return (
    <>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>Commande</h2>
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
                  <CheckoutStepper step={step} />

                  {isEmpty && (
                    <div style={{ padding: '40px 0', textAlign: 'center', color: '#888' }}>
                      <i className="fa fa-shopping-cart fa-3x" style={{ marginBottom: 16, display: 'block', color: '#ccc' }} aria-hidden="true" />
                      <p>Votre panier est vide.</p>
                      <Link href="/shop" className="add_to_cart_button" style={{ display: 'inline-block', marginTop: 12 }}>
                        Aller à la boutique
                      </Link>
                    </div>
                  )}

                  {!isEmpty && step === 1 && (
                    <Step1Address
                      onNext={(b, s, n) => {
                        setBilling(b)
                        setShipping(s)
                        setNote(n)
                        setStep(2)
                      }}
                    />
                  )}

                  {!isEmpty && step === 2 && billing && (
                    <Step2Payment
                      billing={billing}
                      shipping={shipping}
                      note={note}
                      onBack={() => setStep(1)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
