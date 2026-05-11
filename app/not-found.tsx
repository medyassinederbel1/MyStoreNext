import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Page introuvable' }

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        background: '#f5f6fa',
      }}
    >
      <i
        className="fa fa-exclamation-triangle"
        style={{ fontSize: 64, color: '#e84c3d', marginBottom: 24 }}
      />
      <h1 style={{ fontSize: 80, fontWeight: 800, color: '#2c3e50', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: 22, color: '#555', marginBottom: 12 }}>Page introuvable</h2>
      <p style={{ color: '#888', marginBottom: 32, maxWidth: 400 }}>
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        style={{
          background: '#e84c3d',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: 5,
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}
