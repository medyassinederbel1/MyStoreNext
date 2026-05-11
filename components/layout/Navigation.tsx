import { getCategories } from '@/api/categories'
import NavLinks from './NavLinks'

export default async function Navigation() {
  const categories = await getCategories()

  return (
    <nav className="mainmenu-area" aria-label="Navigation principale">
      <div className="container">
        <div className="row">
          <div className="navbar">
            <NavLinks categories={categories} />
          </div>
        </div>
      </div>
    </nav>
  )
}
