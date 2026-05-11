import { apiFetch } from '@/api/client'
import type { Category } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiFetch<Category[]>('/categories')
  return data
}
