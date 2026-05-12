import Link from 'next/link'
import Carousel from './Carousel'
import ProductWidgetCard from './ProductWidgetCard'
import Brands from './Brands'
import PromoBar from './PromoBar'
import HomeWidgets from './HomeClientWidgets'
import { getSlides } from '@/api/slides'
import { getProducts } from '@/api/products'
import { getCategories } from '@/api/categories'

export default async function HomeContent() {
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
