'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useAsync } from '@/hooks/useAsync'
import { useDebounce } from '@/hooks/useDebounce'
import { getCategories } from '@/api/categories'
import { getProducts, getProductById } from '@/api/products'
import { getLastViewedIds } from '@/hooks/useViewedProducts'
import { PRODUCTS_PER_PAGE } from '@/utils/constants'
import type { Category, Product, ProductType } from '@/types'

export function useShopFilters(
  forcedCategoryId?: string,
  initialProducts: Product[] = [],
  initialTotal: number = 0,
  initialCategories: Category[] = [],
) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const categoryId =
    forcedCategoryId !== undefined
      ? forcedCategoryId
      : (searchParams.get('categoryId') ?? '')
  const currentPage = parseInt(searchParams.get('_page') ?? '1', 10)
  const sortKey = searchParams.get('sort') ?? ''
  const urlQuery = searchParams.get('q') ?? ''
  const isTopSeller = searchParams.get('isTopSeller') === 'true'
  const isNewProduct = searchParams.get('isNewProduct') === 'true'
  const isRecentlyViewed = searchParams.get('recentlyViewed') === 'true'
  const typeFilter = (searchParams.get('type') ?? '') as ProductType | ''

  const recentlyViewedIds = isRecentlyViewed ? getLastViewedIds(20) : []

  const [searchInput, setSearchInput] = useState(urlQuery)
  const debouncedSearch = useDebounce(searchInput, 500)

  const searchParamsRef = useRef(searchParams)
  const urlQueryRef = useRef(urlQuery)
  useEffect(() => {
    searchParamsRef.current = searchParams
    urlQueryRef.current = urlQuery
  })

  useEffect(() => {
    setSearchInput(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    const current = searchParamsRef.current
    const currentQ = current.get('q') ?? ''
    if (debouncedSearch === currentQ) return

    const next = new URLSearchParams(current.toString())
    if (debouncedSearch) next.set('q', debouncedSearch); else next.delete('q')
    if (debouncedSearch !== urlQueryRef.current) next.delete('_page')
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [debouncedSearch, pathname, router])

  let _sort: string | undefined
  let _order: 'asc' | 'desc' | undefined
  if (sortKey === 'price_asc') { _sort = 'price'; _order = 'asc' }
  else if (sortKey === 'price_desc') { _sort = 'price'; _order = 'desc' }
  else if (sortKey === 'review_desc') { _sort = 'review'; _order = 'desc' }

  const { data: categoriesData } = useAsync(
    getCategories,
    [],
    { throwOnError: false, initialData: initialCategories.length > 0 ? initialCategories : null },
  )
  const categories = categoriesData ?? initialCategories

  const initialProductsData = initialProducts.length > 0
    ? { products: initialProducts, total: initialTotal }
    : null

  const { data: productsData, loading, error: productsError } = useAsync(
    () =>
      isRecentlyViewed
        ? recentlyViewedIds.length > 0
          ? Promise.all(recentlyViewedIds.map((id) => getProductById(id))).then((prods) => ({
              products: prods,
              total: prods.length,
            }))
          : Promise.resolve({ products: [], total: 0 })
        : getProducts({
            categoryId: categoryId || undefined,
            type: (typeFilter as ProductType) || undefined,
            q: debouncedSearch || undefined,
            isTopSeller: isTopSeller || undefined,
            isNewProduct: isNewProduct || undefined,
            _sort,
            _order,
            _page: currentPage,
            _limit: PRODUCTS_PER_PAGE,
          }),
    [
      categoryId,
      typeFilter,
      debouncedSearch,
      sortKey,
      currentPage,
      isTopSeller,
      isNewProduct,
      isRecentlyViewed,
      recentlyViewedIds.join(','),
    ],
    { throwOnError: false, initialData: initialProductsData },
  )

  const products = productsData?.products ?? initialProducts
  const totalProducts = productsData?.total ?? initialTotal
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)

  const setParam = useCallback((key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    if (value) next.set(key, value); else next.delete(key)
    if (key !== '_page') next.delete('_page')
    const qs = next.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [searchParams, pathname, router])

  const handleCategoryClick = useCallback((id: string) => {
    if (id) {
      router.push(`${pathname}?categoryId=${id}`, { scroll: false })
    } else {
      router.push(pathname, { scroll: false })
    }
    setSearchInput('')
  }, [pathname, router])

  const activeCategory = categories.find((c) => c.id === categoryId)
  let pageTitle = 'Tous les produits'
  if (activeCategory) pageTitle = activeCategory.name
  else if (isTopSeller) pageTitle = 'Meilleures ventes'
  else if (isNewProduct) pageTitle = 'Nouveautés'
  else if (isRecentlyViewed) pageTitle = 'Récemment consultés'
  else if (debouncedSearch) pageTitle = `Résultats pour « ${debouncedSearch} »`

  return {
    categories,
    categoryId,
    typeFilter,
    sortKey,
    isTopSeller,
    isNewProduct,
    searchInput,
    setSearchInput,
    products,
    loading,
    productsError,
    totalProducts,
    totalPages,
    currentPage,
    setParam,
    handleCategoryClick,
    pageTitle,
  }
}
