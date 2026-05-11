import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartContent from './components/CartContent'

export const metadata: Metadata = {
  title: 'Mon Panier',
  description: 'Consultez et modifiez les articles dans votre panier avant de passer commande.',
}

export default function CartPage() {
  return (
    <>
      <Header />
      <CartContent />
      <Footer />
    </>
  )
}
