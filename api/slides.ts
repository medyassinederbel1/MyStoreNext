import { apiFetch } from '@/api/client'
import type { Slide } from '@/types'

export async function getSlides(): Promise<Slide[]> {
  const { data } = await apiFetch<Slide[]>('/slides')
  return data
}
