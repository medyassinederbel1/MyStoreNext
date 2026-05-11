import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import SearchContent from './components/SearchContent'
import Loading from '@/app/loading'

export const metadata: Metadata = {
  title: 'Recherche',
  description: 'Recherchez parmi nos produits smartphones, tablettes et montres connectées.',
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Navigation />
      <Suspense fallback={<Loading />}>
        <SearchContent />
      </Suspense>
      <Footer />
    </>
  )
}
