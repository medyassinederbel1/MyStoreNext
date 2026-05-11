import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ShopContent from './components/ShopContent'
import Loading from '@/app/loading'

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Parcourez notre catalogue de smartphones, tablettes et montres connectées.',
}

export default function ShopPage() {
  return (
    <>
      <Header />
      <Navigation />
      <Suspense fallback={<Loading />}>
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  )
}
