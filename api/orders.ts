import { apiFetch } from '@/api/client'
import type { Order } from '@/types'

export async function postOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  const { data } = await apiFetch<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify({ ...order, createdAt: new Date().toISOString() }),
  })
  return data
}
