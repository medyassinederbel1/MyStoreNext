'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function HeaderSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/cart' || pathname === '/checkout') return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim().slice(0, 100)
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSearch} style={{ marginTop: 30 }} role="search">
      <input
        type="search"
        placeholder="Rechercher des produits..."
        value={query}
        maxLength={100}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Rechercher"
      />
      <button type="submit" aria-label="Lancer la recherche">
        Search
      </button>
    </form>
  )
}
