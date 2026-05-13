import type { Metadata } from 'next'
import CheckoutContent from './_components/CheckoutContent'

export const metadata: Metadata = {
  title: 'Commande',
  description: 'Finalisez votre commande en renseignant votre adresse et votre mode de paiement.',
}

export default function CheckoutPage() {
  return <CheckoutContent />
}
