import { Fragment } from 'react'

interface Props {
  step: 1 | 2
}

const STEPS = [
  { id: 1, label: '1 — Adresse' },
  { id: 2, label: '2 — Paiement' },
] as const

export default function CheckoutStepper({ step }: Props) {
  return (
    <nav aria-label="Étapes de la commande" style={{ marginBottom: 24 }}>
      <ol style={{ display: 'flex', gap: 8, alignItems: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
        {STEPS.map(({ id, label }, i) => (
          <Fragment key={id}>
            <li>
              <span
                aria-current={step === id ? 'step' : undefined}
                style={{
                  padding: '4px 14px',
                  borderRadius: 20,
                  background: step === id ? '#e84c3d' : '#eee',
                  color: step === id ? '#fff' : '#888',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {label}
              </span>
            </li>
            {i < STEPS.length - 1 && (
              <li aria-hidden="true" style={{ color: '#ccc' }}>▶</li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
