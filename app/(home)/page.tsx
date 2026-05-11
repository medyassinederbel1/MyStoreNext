import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Carousel from './components/Carousel'
import ProductWidgetCard from './components/ProductWidgetCard'
import Brands from './components/Brands'
import PromoBar from './components/PromoBar'
import HomeClientWidgets from './components/HomeClientWidgets'
import { getSlides } from '@/api/slides'
import { getProducts } from '@/api/products'
import { getCategories } from '@/api/categories'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Découvrez notre sélection de smartphones, tablettes et montres connectées aux meilleurs prix.',
}

export default async function HomePage() {
  const [slides, categories, topNewData] = await Promise.all([
    getSlides(),
    getCategories(),
    getProducts({ isNewProduct: true }),
  ])

  const topNew = topNewData.products

  return (
    <>
      <Header />
      <Navigation />

      <Carousel slides={slides} />
      <PromoBar />
      <Brands categories={categories} />

      <div className="product-widget-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <HomeClientWidgets />

            <div className="col-md-4">
              <div className="single-product-widget">
                <h2 className="product-wid-title">Top New</h2>
                <Link href="/shop?isNewProduct=true" className="btn btn-link p-0">
                  View All
                </Link>
                {topNew.map((p) => (
                  <ProductWidgetCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
