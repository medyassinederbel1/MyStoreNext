const LS_KEY = 'viewedProducts'

function getViewed(): number[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as number[]
  } catch {
    return []
  }
}

export function markAsViewed(productId: number): void {
  const viewed = getViewed().filter((id) => id !== productId)
  viewed.push(productId)
  localStorage.setItem(LS_KEY, JSON.stringify(viewed))
}

export function isViewed(productId: number): boolean {
  return getViewed().includes(productId)
}

export function getLastViewedIds(limit = 3): number[] {
  const viewed = getViewed()
  return viewed.slice(-limit).reverse()
}
