'use client'

import { useCallback, useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import ShopSidebar from './ShopSidebar'
import ProductGrid from './ProductGrid'
import { useShopFilters } from '@/hooks/useShopFilters'
import type { Category, Product } from '@/types'

interface Props {
  categoryId?: string
  initialProducts?: Product[]
  initialTotal?: number
  initialCategories?: Category[]
}

export default function ShopContent({
  categoryId: forcedCategoryId,
  initialProducts = [],
  initialTotal = 0,
  initialCategories = [],
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const {
    categories,
    categoryId,
    typeFilter,
    sortKey,
    searchInput,
    setSearchInput,
    products,
    loading,
    totalProducts,
    totalPages,
    currentPage,
    setParam,
    handleCategoryClick,
    pageTitle,
  } = useShopFilters(forcedCategoryId, initialProducts, initialTotal, initialCategories)

  const onCategoryClick = useCallback(
    (id: string) => {
      if (forcedCategoryId !== undefined) {
        router.push(id ? `/shop/${id}` : '/shop')
      } else {
        handleCategoryClick(id)
      }
    },
    [forcedCategoryId, handleCategoryClick, router],
  )

  const onSortChange = useCallback((v: string) => setParam('sort', v), [setParam])
  const onTypeChange = useCallback((v: string) => setParam('type', v), [setParam])
  const onPageChange = useCallback((page: number) => setParam('_page', String(page)), [setParam])

  return (
    <>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{pageTitle}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <ShopSidebar
              categories={categories}
              categoryId={categoryId}
              typeFilter={typeFilter}
              sortKey={sortKey}
              searchInput={searchInput}
              onSearchChange={setSearchInput}
              onSortChange={onSortChange}
              onTypeChange={onTypeChange}
              onCategoryClick={onCategoryClick}
            />
            <ProductGrid
              products={products}
              loading={loading}
              totalProducts={totalProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}
