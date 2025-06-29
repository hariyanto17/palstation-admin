import {
  Contact,
  Header,
  MainHome,
  Price,
  Service,
  Testimony,
  Footer,
} from '@/components/Dashboard'

export default function Home() {
  return (
    <>
      <Header />
      <MainHome />
      <Service />
      <Price />
      <Testimony />
      <Contact />
      <Footer />
    </>
  )
}
