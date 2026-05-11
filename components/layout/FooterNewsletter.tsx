'use client'

import { useState } from 'react'
import { validateEmail } from '@/utils/validators'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) { setError(err); return }
    setError('')
    setEmail('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="footer-newsletter">
      <h2 className="footer-wid-title">Newsletter</h2>
      <p>Inscrivez-vous et recevez nos offres exclusives directement dans votre boîte mail !</p>
      <div className="newsletter-form">
        {submitted ? (
          <p style={{ color: '#27ae60', fontWeight: 600 }}>
            <i className="fa fa-check" style={{ marginRight: 6 }} />
            Merci pour votre inscription !
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              maxLength={254}
              onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
              aria-label="Adresse email newsletter"
              required
            />
            {error && (
              <span
                role="alert"
                style={{ color: '#e84c3d', fontSize: 11, display: 'block', marginTop: 4 }}
              >
                {error}
              </span>
            )}
            <input type="submit" value="S'inscrire" />
          </form>
        )}
      </div>
    </div>
  )
}
