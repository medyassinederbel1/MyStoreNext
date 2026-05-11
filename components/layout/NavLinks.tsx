'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types'

interface Props {
  categories: Category[]
}

export default function NavLinks({ categories }: Props) {
  const pathname = usePathname()

  return (
    <ul className="nav navbar-nav navbar-expand">
      <li className={pathname === '/' ? 'active' : ''}>
        <Link href="/">Home</Link>
      </li>
      {categories.map((cat) => (
        <li
          key={cat.id}
          className={pathname.startsWith(`/shop/${cat.id}`) ? 'active' : ''}
        >
          <Link href={`/shop/${cat.id}`}>{cat.name}</Link>
        </li>
      ))}
      <li className={pathname === '/shop' ? 'active' : ''}>
        <Link href="/shop">Tous les produits</Link>
      </li>
    </ul>
  )
}
