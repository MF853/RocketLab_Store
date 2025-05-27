import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './contexts/CartContext'
import { PriceAlertProvider } from './contexts/PriceAlertContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { ProductCard } from './components/ProductCard'
import { Cart } from './components/Cart'
import { CartModal } from './components/CartModal'
import { NotificationButton } from './components/NotificationButton'
import { WishlistButton } from './components/WishlistButton'
import { CategoryFilter } from './components/CategoryFilter'
import { Footer } from './components/Footer'
import { ProductPage } from './pages/ProductPage'
import { WishlistPage } from './pages/WishlistPage'
import type { ProductCategory, ProductsData } from './types/Product'
import rawProductsData from './data/products.json'

const productsData = rawProductsData as unknown as ProductsData;

function Layout({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { total } = useCart()

  return (
    <div className="min-h-screen bg-[#282a36] flex flex-col">
      <header className="bg-[#44475a] shadow-lg sticky top-0 z-40 transition-all duration-300 border-b border-[#6272a4]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f8f8f2] transition-all duration-300">
              <a href="/" className="hover:text-[#bd93f9] transition-colors flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-8 h-8"
                >
                  <path d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                </svg>
                RocketLab Store
              </a>
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <NotificationButton />
              <WishlistButton />
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
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = selectedCategories.length === 0
    ? productsData.products
    : productsData.products.filter(product => selectedCategories.includes(product.category));

  return (
    <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 flex-grow min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4">
        {/* Products Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <Cart />
          </div>
        </div>

        {/* Filter Button - Now visible on all screens */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="fixed bottom-4 left-4 z-50 bg-[#bd93f9] text-[#282a36] p-3 rounded-full shadow-lg hover:bg-[#ff79c6] transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="hidden sm:inline text-sm font-medium">Filtrar</span>
        </button>

        {/* Filter Modal - Now for all screens */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-[#282a36] bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-full max-w-md mx-4 bg-[#282a36] rounded-xl p-4 transform transition-transform duration-300 ease-in-out">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#f8f8f2] font-semibold text-lg">Filtrar por Categoria</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-[#f8f8f2] hover:text-[#ff79c6] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CategoryFilter
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <PriceAlertProvider>
          <NotificationProvider>
            <WishlistProvider>
              <Routes>
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
                <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
              </Routes>
            </WishlistProvider>
          </NotificationProvider>
        </PriceAlertProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
