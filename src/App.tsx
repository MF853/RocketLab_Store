import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './contexts/CartContext'
import { ProductCard } from './components/ProductCard'
import { Cart } from './components/Cart'
import { CartModal } from './components/CartModal'
import { Footer } from './components/Footer'
import { ProductPage } from './pages/ProductPage'
import productsData from './data/products.json'

function Layout({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { total } = useCart()

  return (
    <div className="min-h-screen bg-[#282a36] flex flex-col">
      <header className="bg-[#44475a] shadow-lg sticky top-0 z-40 transition-all duration-300 border-b border-[#6272a4]">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f8f8f2] transition-all duration-300">
              <a href="/" className="hover:text-[#bd93f9] transition-colors">RocketLab Store</a>
            </h1>
            <div className="space-x-2 sm:space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#bd93f9] text-[#282a36] px-4 py-2 text-sm sm:text-base rounded-md hover:bg-[#ff79c6] transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(total)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {children}
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  )
}

function HomePage() {
  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="md:col-span-2 lg:col-span-3 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {productsData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-24 transition-all duration-300">
            <Cart />
          </div>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
