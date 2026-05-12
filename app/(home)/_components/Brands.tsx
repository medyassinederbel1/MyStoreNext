import Link from 'next/link'
import Image from 'next/image'
import type { Category } from '@/types'

interface Props {
  categories: Category[]
}

export default function Brands({ categories }: Props) {
  return (
    <section className="brands-area" aria-label="Nos marques">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="brand-wrapper">
              <div className="brand-list">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <Link href={`/shop/${cat.id}`} aria-label={`Voir les produits ${cat.name}`}>
                      <Image
                        src={`/images/brands/${cat.image}`}
                        alt={cat.name}
                        width={140}
                        height={60}
                        loading="lazy"
                        style={{ objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
