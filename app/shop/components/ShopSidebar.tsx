'use client'

import { memo } from 'react'
import type { Category, ProductType } from '@/types'
import { SORT_OPTIONS } from '@/utils/constants'

const PRODUCT_TYPES: { value: ProductType; label: string; icon: string }[] = [
  { value: 'phone', label: 'Téléphones', icon: 'fa-mobile' },
  { value: 'tablet', label: 'Tablettes', icon: 'fa-tablet' },
  { value: 'watch', label: 'Montres', icon: 'fa-clock-o' },
]

interface Props {
  categories: Category[]
  categoryId: string
  typeFilter: ProductType | ''
  sortKey: string
  searchInput: string
  onSearchChange: (v: string) => void
  onSortChange: (v: string) => void
  onTypeChange: (v: ProductType | '') => void
  onCategoryClick: (id: string) => void
}

export default memo(function ShopSidebar({
  categories,
  categoryId,
  typeFilter,
  sortKey,
  searchInput,
  onSearchChange,
  onSortChange,
  onTypeChange,
  onCategoryClick,
}: Props) {
  const activeBtnStyle = (active: boolean): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 0',
    fontWeight: active ? 700 : 400,
    color: active ? '#e84c3d' : '#555',
    textDecoration: active ? 'underline' : 'none',
  })

  return (
    <aside className="col-md-3" aria-label="Filtres">
      <div className="shop-sidebar-widget" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 10 }}>Rechercher</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            type="search"
            className="form-control"
            placeholder="Nom du produit…"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ flex: 1 }}
            aria-label="Rechercher dans la boutique"
          />
          {searchInput && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Effacer la recherche"
              style={{ background: 'none', border: '1px solid #ccc', borderRadius: 4, padding: '0 8px', cursor: 'pointer' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="shop-sidebar-widget" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 10 }}>Trier par</h3>
        <select
          className="form-control"
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Trier les produits"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="shop-sidebar-widget" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 10 }}>Type de produit</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} role="list">
          <li style={{ marginBottom: 6 }}>
            <button onClick={() => onTypeChange('')} style={activeBtnStyle(!typeFilter)}>
              <i className="fa fa-th-large" style={{ marginRight: 6 }} aria-hidden="true" />
              Tous les types
            </button>
          </li>
          {PRODUCT_TYPES.map((t) => (
            <li key={t.value} style={{ marginBottom: 6 }}>
              <button onClick={() => onTypeChange(t.value)} style={activeBtnStyle(typeFilter === t.value)}>
                <i className={`fa ${t.icon}`} style={{ marginRight: 6 }} aria-hidden="true" />
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="shop-sidebar-widget">
        <h3 style={{ marginBottom: 10 }}>Catégories</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} role="list">
          <li style={{ marginBottom: 6 }}>
            <button onClick={() => onCategoryClick('')} style={activeBtnStyle(!categoryId)}>
              <i className="fa fa-th" style={{ marginRight: 6 }} aria-hidden="true" />
              Toutes les catégories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id} style={{ marginBottom: 6 }}>
              <button onClick={() => onCategoryClick(cat.id)} style={activeBtnStyle(categoryId === cat.id)}>
                <i className="fa fa-circle-o" style={{ marginRight: 6 }} aria-hidden="true" />
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
})
