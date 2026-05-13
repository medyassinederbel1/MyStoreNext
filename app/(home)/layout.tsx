import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
