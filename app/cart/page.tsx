import type { Metadata } from 'next'
import CartContent from './_components/CartContent'

export const metadata: Metadata = {
  title: 'Mon Panier',
  description: 'Consultez et modifiez les articles dans votre panier avant de passer commande.',
}

export default function CartPage() {
  return <CartContent />
}
