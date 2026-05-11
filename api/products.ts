import { apiFetch } from '@/api/client'
import type { Product } from '@/types'

export interface ProductFilters {
  categoryId?: string
  type?: 'tablet' | 'phone' | 'watch'
  q?: string
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  isTopSeller?: boolean
  isNewProduct?: boolean
}

function buildQuery(filters: ProductFilters): string {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value))
    }
  })
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<{ products: Product[]; total: number }> {
  const { data, headers } = await apiFetch<Product[]>(`/products${buildQuery(filters)}`)
  const total = parseInt(headers.get('X-Total-Count') ?? '0', 10)
  return { products: data, total }
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await apiFetch<Product>(`/products/${id}`)
  return data
}
