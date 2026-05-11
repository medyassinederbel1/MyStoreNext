'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export type ErrorContext =
  | 'home'
  | 'shop'
  | 'product'
  | 'search'
  | 'cart'
  | 'checkout'

interface ErrorDisplayProps {
  error: Error & { digest?: string }
  reset: () => void
  context?: ErrorContext
}

interface ContextInfo {
  heading: string
  hint: string
  backHref: string
  backLabel: string
}

const contextInfo: Record<ErrorContext, ContextInfo> = {
  home: {
    heading: "La page d'accueil est temporairement indisponible",
    hint: 'Notre boutique rencontre un problème technique. Réessayez dans quelques instants.',
    backHref: '/',
    backLabel: 'Actualiser la page',
  },
  shop: {
    heading: 'Impossible de charger la boutique',
    hint: 'La liste des produits est temporairement indisponible. Réessayez ou revenez à l\'accueil.',
    backHref: '/',
    backLabel: "Retour à l'accueil",
  },
  product: {
    heading: 'Ce produit est temporairement inaccessible',
    hint: "Impossible de charger les détails de ce produit. Réessayez ou parcourez d'autres articles.",
    backHref: '/shop',
    backLabel: 'Voir la boutique',
  },
  search: {
    heading: 'La recherche est temporairement indisponible',
    hint: 'Impossible d\'effectuer la recherche en ce moment. Réessayez ou naviguez via les catégories.',
    backHref: '/shop',
    backLabel: 'Parcourir la boutique',
  },
  cart: {
    heading: 'Impossible d\'accéder au panier',
    hint: 'Vos articles sont sauvegardés localement. Rechargez la page pour retrouver votre panier.',
    backHref: '/shop',
    backLabel: 'Continuer mes achats',
  },
  checkout: {
    heading: 'Une erreur est survenue pendant la commande',
    hint: 'Votre commande n\'a pas été passée. Réessayez ou revenez à votre panier pour vérifier vos articles.',
    backHref: '/cart',
    backLabel: 'Retour au panier',
  },
}

function getErrorMessage(error: Error): { title: string; description: string } {
  const apiError = error as Error & { type?: string; status?: number }

  if (apiError.type === 'network') {
    return {
      title: 'Connexion au serveur impossible',
      description:
        'Impossible de joindre notre serveur. Vérifiez votre connexion internet et réessayez. Si le problème persiste, notre service est peut-être en maintenance.',
    }
  }

  if (apiError.status === 404) {
    return {
      title: 'Ressource introuvable',
      description:
        'La ressource demandée n\'existe pas ou a été supprimée. Vérifiez l\'URL ou retournez à l\'accueil.',
    }
  }

  if (apiError.status === 500 || apiError.status === 503) {
    return {
      title: 'Erreur interne du serveur',
      description:
        'Notre serveur a rencontré une erreur interne. L\'équipe technique a été informée. Réessayez dans quelques minutes.',
    }
  }

  if (apiError.status !== undefined) {
    return {
      title: `Erreur ${apiError.status}`,
      description:
        'Une erreur inattendue est survenue lors de la communication avec notre serveur. Réessayez ou contactez le support.',
    }
  }

  return {
    title: 'Une erreur inattendue est survenue',
    description:
      'Quelque chose s\'est mal passé. Notre équipe technique a été informée. Réessayez dans quelques instants.',
  }
}

export default function ErrorDisplay({ error, reset, context = 'home' }: ErrorDisplayProps) {
  const ctx = contextInfo[context]
  const { title: errorTitle, description: errorDescription } = getErrorMessage(error)
  const isNetworkError = (error as Error & { type?: string }).type === 'network'

  useEffect(() => {
    console.error(`[ErrorBoundary:${context}]`, error)
  }, [error, context])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <header
        style={{
          background: '#2b2b2b',
          padding: '14px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: 1,
          }}
        >
          MyStore
        </Link>
        <Link
          href="/"
          style={{
            color: '#cccccc',
            textDecoration: 'none',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <i className="fa fa-home" />
          Accueil
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: '#f5f6fa',
        }}
      >
        <div
          style={{
            maxWidth: 620,
            width: '100%',
            background: '#ffffff',
            borderRadius: 10,
            boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: 6,
              background: isNetworkError
                ? 'linear-gradient(90deg, #e67e22, #f39c12)'
                : 'linear-gradient(90deg, #e74c3c, #c0392b)',
            }}
          />

          <div style={{ padding: '40px 40px 36px' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <i
                className={isNetworkError ? 'fa fa-wifi' : 'fa fa-exclamation-circle'}
                style={{
                  fontSize: 60,
                  color: isNetworkError ? '#e67e22' : '#e74c3c',
                }}
              />
            </div>

            <h1
              style={{
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: '#2c3e50',
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              {ctx.heading}
            </h1>

            <div
              style={{
                background: isNetworkError ? '#fef9f0' : '#fdf2f2',
                border: `1px solid ${isNetworkError ? '#f5cba7' : '#f5c6cb'}`,
                borderRadius: 6,
                padding: '14px 18px',
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: isNetworkError ? '#a04000' : '#922b21' }}>
                {errorTitle}
              </p>
            </div>

            <p
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#555',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              {errorDescription}
            </p>

            <p
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: '#888',
                lineHeight: 1.6,
                marginBottom: 30,
              }}
            >
              {ctx.hint}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={reset}
                style={{
                  background: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 5,
                  padding: '11px 26px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <i className="fa fa-refresh" />
                Réessayer
              </button>

              <Link
                href={ctx.backHref}
                style={{
                  background: '#2c3e50',
                  color: '#fff',
                  borderRadius: 5,
                  padding: '11px 26px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <i className="fa fa-arrow-left" />
                {ctx.backLabel}
              </Link>
            </div>


          </div>
        </div>
      </main>

      <footer
        style={{
          background: '#2b2b2b',
          color: '#999',
          textAlign: 'center',
          padding: '18px',
          fontSize: 13,
        }}
      >
        © {new Date().getFullYear()} MyStore — Tous droits réservés
      </footer>
    </div>
  )
}
