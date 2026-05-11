import Image from 'next/image'
import Link from 'next/link'
import HeaderSearch from './HeaderSearch'
import HeaderCart from './HeaderCart'

export default function Header() {
  return (
    <header className="site-branding-area">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="logo">
              <h1>
                <Link href="/" aria-label="MyStore — Accueil">
                  <Image
                    src="/logo.png"
                    alt="MyStore"
                    width={100}
                    height={100}
                    priority
                  />
                </Link>
              </h1>
            </div>
          </div>

          <div className="col-sm-4">
            <HeaderSearch />
          </div>

          <div className="col-sm-4">
            <HeaderCart />
          </div>
        </div>
      </div>
    </header>
  )
}
