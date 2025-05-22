import { useState } from 'react'
import { CartProvider } from './contexts/CartContext'
import { ProductCard } from './components/ProductCard'
import { Cart } from './components/Cart'
import productsData from './data/products.json'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">Loja Online</h1>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {isCartOpen ? 'Fechar Carrinho' : 'Ver Carrinho'}
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className={`md:col-span-2 lg:col-span-3 ${isCartOpen ? 'hidden md:block' : ''}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsData.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            
            <div className={`md:col-span-1 ${isCartOpen ? 'block' : 'hidden md:block'}`}>
              <div className="sticky top-4">
                <Cart />
              </div>
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  )
}

export default App
