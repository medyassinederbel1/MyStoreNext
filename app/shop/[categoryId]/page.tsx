import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ShopContent from '../_components/ShopContent'
import { getCategories } from '@/api/categories'
import { getProducts } from '@/api/products'
import { PRODUCTS_PER_PAGE } from '@/utils/constants'

export const revalidate = 60
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ categoryId: string }>
  searchParams: Promise<Record<string, string>>
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

export default async function ShopCategoryPage({ params, searchParams }: Props) {
  const { categoryId } = await params
  const sp = await searchParams
  const page = parseInt(sp._page ?? '1', 10)
  const sort = sp.sort ?? ''

  let _sort: string | undefined
  let _order: 'asc' | 'desc' | undefined
  if (sort === 'price_asc') { _sort = 'price'; _order = 'asc' }
  else if (sort === 'price_desc') { _sort = 'price'; _order = 'desc' }
  else if (sort === 'review_desc') { _sort = 'review'; _order = 'desc' }

  const [categoriesData, productsData] = await Promise.all([
    getCategories(),
    getProducts({
      categoryId,
      _sort,
      _order,
      _page: page,
      _limit: PRODUCTS_PER_PAGE,
    }),
  ])

  return (
    <>
      <Header />
      <Navigation />
      <ShopContent
        categoryId={categoryId}
        initialProducts={productsData.products}
        initialTotal={productsData.total}
        initialCategories={categoriesData}
      />
      <Footer />
    </>
  )
}
