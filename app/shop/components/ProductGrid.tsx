'use client'

import { memo } from 'react'
import ProductShopCard from '@/components/shop/ProductShopCard'
import Pagination from '@/components/shop/Pagination'
import type { Product } from '@/types'

interface Props {
  products: Product[]
  loading: boolean
  totalProducts: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default memo(function ProductGrid({
  products,
  loading,
  totalProducts,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <section className="col-md-9" aria-label="Grille de produits" aria-live="polite" aria-busy={loading}>
      <p style={{ marginBottom: 16, color: '#888', fontSize: 14 }}>
        {loading
          ? 'Chargement des produits…'
          : `${totalProducts} produit${totalProducts !== 1 ? 's' : ''} trouvé${totalProducts !== 1 ? 's' : ''}`}
      </p>

      {!loading && products.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#888' }}>
          <i className="fa fa-search" style={{ fontSize: 40, marginBottom: 12, display: 'block' }} aria-hidden="true" />
          <p>Aucun produit trouvé. Modifiez vos filtres.</p>
        </div>
      ) : (
        <div className="row">
          {loading
            ? Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="col-md-4 col-sm-6" aria-hidden="true">
                  <div style={{ height: 280, background: '#f5f5f5', borderRadius: 4, marginBottom: 24 }} />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="col-md-4 col-sm-6">
                  <ProductShopCard product={product} />
                </div>
              ))}
        </div>
      )}

      <div className="row">
        <div className="col-md-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </section>
  )
})
