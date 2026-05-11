'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAsync } from '@/hooks/useAsync'
import { getProducts } from '@/api/products'
import ProductShopCard from '@/components/shop/ProductShopCard'
import Pagination from '@/components/shop/Pagination'
import { SORT_OPTIONS } from '@/utils/constants'

const LIMIT = 12

export default function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState('')

  useEffect(() => {
    setPage(1)
    setSortKey('')
  }, [q])

  const [sortField, sortOrder] = sortKey
    ? (sortKey.split('_') as [string, 'asc' | 'desc'])
    : [undefined, undefined]

  const { data, loading } = useAsync(
    () =>
      getProducts({
        q,
        _page: page,
        _limit: LIMIT,
        ...(sortField ? { _sort: sortField, _order: sortOrder } : {}),
      }),
    [q, page, sortKey],
  )

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / LIMIT)

  const handlePageChange = useCallback((p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{q ? `Résultats pour « ${q} »` : 'Recherche'}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <span style={{ color: '#888', fontSize: 14 }} aria-live="polite">
                  {loading
                    ? 'Recherche en cours…'
                    : `${total} résultat${total !== 1 ? 's' : ''} pour « ${q} »`}
                </span>

                <select
                  className="form-control"
                  style={{ width: 'auto', minWidth: 180 }}
                  value={sortKey}
                  onChange={(e) => { setSortKey(e.target.value); setPage(1) }}
                  aria-label="Trier les résultats"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {!loading && total === 0 ? (
                <div style={{ padding: '60px 0', textAlign: 'center', color: '#888' }}>
                  <i className="fa fa-search" style={{ fontSize: 40, marginBottom: 12, display: 'block' }} aria-hidden="true" />
                  <p>Aucun produit trouvé pour « {q} ».</p>
                </div>
              ) : (
                <div className="row" aria-live="polite" aria-busy={loading}>
                  {loading
                    ? Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="col-md-3 col-sm-6" aria-hidden="true">
                          <div style={{ height: 280, background: '#f5f5f5', borderRadius: 4, marginBottom: 24 }} />
                        </div>
                      ))
                    : products.map((product) => (
                        <div key={product.id} className="col-md-3 col-sm-6">
                          <ProductShopCard product={product} />
                        </div>
                      ))}
                </div>
              )}

              <div className="row">
                <div className="col-md-12">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
