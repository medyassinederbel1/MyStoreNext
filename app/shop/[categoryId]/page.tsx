import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ShopContent from '../components/ShopContent'
import Loading from '@/app/loading'
import { getCategories } from '@/api/categories'

export const revalidate = 60

interface Props {
  params: Promise<{ categoryId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params
  try {
    const categories = await getCategories()
    const category = categories.find((c) => c.id === categoryId)
    return {
      title: category?.name ?? 'Catégorie',
      description: `Découvrez notre sélection ${category?.name ?? ''} aux meilleurs prix.`,
    }
  } catch {
    return { title: 'Catégorie' }
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((c) => ({ categoryId: c.id }))
  } catch {
    return []
  }
}

export default async function ShopCategoryPage({ params }: Props) {
  const { categoryId } = await params

  return (
    <>
      <Header />
      <Navigation />
      <Suspense fallback={<Loading />}>
        <ShopContent categoryId={categoryId} />
      </Suspense>
      <Footer />
    </>
  )
}
