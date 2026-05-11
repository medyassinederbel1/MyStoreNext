import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ProductSidebar from './components/ProductSidebar'
import ProductInfo from './components/ProductInfo'
import ProductAddToCartClient from './components/ProductAddToCartClient'
import RecentlyViewedSidebarClient from './components/RecentlyViewedSidebarClient'
import { getProductById, getProducts } from '@/api/products'
import { getCategories } from '@/api/categories'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const product = await getProductById(Number(id))
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [`/images/products/${product.categoryName}/${product.imageName}`],
      },
    }
  } catch {
    return { title: 'Produit introuvable' }
  }
}

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ _limit: 100 })
    return products.map((p) => ({ id: String(p.id) }))
  } catch {
    return []
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const productId = Number(id)

  let product
  try {
    product = await getProductById(productId)
  } catch {
    notFound()
  }

  const categories = await getCategories()
  const currentCategory = categories.find((c) => c.id === product.categoryId)

  return (
    <>
      <Header />
      <Navigation />

      <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <RecentlyViewedSidebarClient productId={productId} />
              <ProductSidebar
                categories={categories}
                currentCategoryId={product.categoryId}
              />
            </div>

            <div className="col-md-8">
              <div className="product-content-right">
                <div className="product-breadcroumb">
                  <Link href="/">Home</Link>
                  <Link href={`/shop/${product.categoryId}`}>
                    {currentCategory?.name ?? product.categoryName}
                  </Link>
                  <span>{product.name}</span>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="product-images">
                      <div className="product-main-img">
                        <Image
                          src={`/images/products/${product.categoryName}/${product.imageName}`}
                          alt={product.name}
                          width={450}
                          height={450}
                          priority
                          style={{ width: '100%', height: 'auto', borderRadius: 4, objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <ProductInfo product={product} />
                    <ProductAddToCartClient product={product} />
                  </div>
                </div>

                <div className="product-inner-category" style={{ marginTop: 24 }}>
                  <h2>Description du produit</h2>
                  <p style={{ lineHeight: 1.7, color: '#555' }}>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
