import Link from 'next/link'
import { getCategories } from '@/api/categories'
import FooterNewsletter from './FooterNewsletter'

export default async function Footer() {
  const categories = await getCategories()

  return (
    <footer className="footer-top-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="footer-about-us">
              <h2><span>MyStore</span></h2>
              <p>
                Bienvenue sur MyStore, votre boutique en ligne spécialisée dans la vente de
                téléphones mobiles et d&apos;accessoires de qualité. Notre mission est de vous
                proposer les derniers modèles de smartphones aux meilleurs prix, tout en
                garantissant une expérience d&apos;achat simple, rapide et sécurisée.
              </p>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="footer-menu">
              <h2 className="footer-wid-title">Catégories</h2>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/shop/${cat.id}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <FooterNewsletter />
          </div>
        </div>
      </div>
    </footer>
  )
}
