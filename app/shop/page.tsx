import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ShopContent from './_components/ShopContent'
import { getProducts } from '@/api/products'
import { getCategories } from '@/api/categories'
import { PRODUCTS_PER_PAGE } from '@/utils/constants'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Parcourez notre catalogue de smartphones, tablettes et montres connectées.',
}

interface Props {
  searchParams: Promise<Record<string, string>>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  const page = parseInt(params._page ?? '1', 10)
  const categoryId = params.categoryId ?? ''
  const q = params.q ?? ''
  const sort = params.sort ?? ''

  let _sort: string | undefined
  let _order: 'asc' | 'desc' | undefined
  if (sort === 'price_asc') { _sort = 'price'; _order = 'asc' }
  else if (sort === 'price_desc') { _sort = 'price'; _order = 'desc' }
  else if (sort === 'review_desc') { _sort = 'review'; _order = 'desc' }

  const [categoriesData, productsData] = await Promise.all([
    getCategories(),
    getProducts({
      categoryId: categoryId || undefined,
      q: q || undefined,
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
        initialProducts={productsData.products}
        initialTotal={productsData.total}
        initialCategories={categoriesData}
      />
      <Footer />
    </>
  )
}
