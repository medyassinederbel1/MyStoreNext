import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CheckoutContent from './components/CheckoutContent'

export const metadata: Metadata = {
  title: 'Commande',
  description: 'Finalisez votre commande en renseignant votre adresse et votre mode de paiement.',
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <Navigation />
      <CheckoutContent />
      <Footer />
    </>
  )
}
