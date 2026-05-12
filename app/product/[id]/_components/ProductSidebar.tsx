import Link from 'next/link'
import type { Category } from '@/types'

interface Props {
  categories: Category[]
  currentCategoryId: string
}

export default function ProductSidebar({ categories, currentCategoryId }: Props) {
  const otherCategories = categories.filter((c) => c.id !== currentCategoryId)

  return (
    <aside className="single-sidebar" aria-label="Autres catégories">
      <h2 className="sidebar-title">Autres marques</h2>
      <ul>
        {otherCategories.map((c) => (
          <li key={c.id}>
            <Link href={`/shop/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
