import { useState } from 'react'
import { CartProvider } from './contexts/CartContext'
import { ProductCard } from './components/ProductCard'
import { Cart } from './components/Cart'
import { CartModal } from './components/CartModal'
import productsData from './data/products.json'

function App() {
  // Estados para controlar a visibilidade do carrinho lateral e do modal
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    // Provedor do contexto do carrinho para compartilhar estado entre componentes
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Header fixo com navegação e botões do carrinho */}
        <header className="bg-white shadow-md sticky top-0 z-40 transition-all duration-300">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 transition-all duration-300">RocketLab Store</h1>
              <div className="space-x-2 sm:space-x-4">
                {/* Botão para abrir o modal do carrinho */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Ver Carrinho
                </button>
                {/* Botão para toggle do carrinho lateral em telas pequenas */}
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="bg-gray-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 md:hidden"
                >
                  {isCartOpen ? 'Fechar Lateral' : 'Ver Lateral'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo principal com grid responsivo */}
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Grid de produtos que se ajusta quando o carrinho lateral está aberto */}
            <div className={`md:col-span-2 lg:col-span-3 transition-all duration-300 ease-in-out ${isCartOpen ? 'hidden md:block' : ''}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Mapeamento dos produtos para cards */}
                {productsData.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            
            {/* Carrinho lateral com posição fixa */}
            <div className={`md:col-span-1 transition-all duration-300 ease-in-out transform ${isCartOpen ? 'translate-x-0 opacity-100' : 'md:translate-x-0 md:opacity-100 translate-x-full opacity-0 hidden md:block'}`}>
              <div className="sticky top-24 transition-all duration-300">
                <Cart />
              </div>
            </div>
          </div>
        </main>

        {/* Modal do carrinho com overlay */}
        <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </CartProvider>
  )
}

export default App
