import type { Metadata } from 'next'
import Link from 'next/link'
import Carousel from './_components/Carousel'
import ProductWidgetCard from './_components/ProductWidgetCard'
import Brands from './_components/Brands'
import PromoBar from './_components/PromoBar'
import HomeWidgets from './_components/HomeClientWidgets'
import RecentlyViewedWidget from './_components/RecentlyViewedWidget'
import { getSlides } from '@/api/slides'
import { getProducts } from '@/api/products'
import { getCategories } from '@/api/categories'

export const revalidate = 60

// Disable streaming — send complete HTML in one shot (required for no-JS visibility)
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Découvrez notre sélection de smartphones, tablettes et montres connectées aux meilleurs prix.',
}

export default async function HomePage() {
  const [slides, categories, topSellersData, topNewData] = await Promise.all([
    getSlides(),
    getCategories(),
    getProducts({ isTopSeller: true }),
    getProducts({ isNewProduct: true }),
  ])

  const topSellers = topSellersData.products
  const topNew = topNewData.products

  return (
    <>
      <Carousel slides={slides} />
      <PromoBar />
      <Brands categories={categories} />
      <div className="product-widget-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <HomeWidgets topSellers={topSellers} />
            <RecentlyViewedWidget />
            <div className="col-md-4">
              <div className="single-product-widget">
                <h2 className="product-wid-title">Nouveautés</h2>
                <Link href="/shop?isNewProduct=true" className="btn btn-link p-0">
                  Voir tout
                </Link>
                {topNew.map((p) => (
                  <ProductWidgetCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
