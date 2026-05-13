import type { Metadata } from 'next'
import SearchContent from './_components/SearchContent'
import { getProducts } from '@/api/products'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Recherche',
  description: 'Recherchez parmi nos produits smartphones, tablettes et montres connectées.',
}

interface Props {
  searchParams: Promise<Record<string, string>>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = params.q ?? ''

  const { products, total } = await getProducts({ q, _page: 1, _limit: 12 })

  return <SearchContent initialProducts={products} initialTotal={total} initialQ={q} />
}
