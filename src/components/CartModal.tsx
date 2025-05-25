import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  // Hook personalizado para acessar o estado e funções do carrinho
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  // Estado para controlar a animação de fade do modal
  const [isAnimating, setIsAnimating] = useState(false);

  // Efeito para controlar a animação de entrada e saída do modal
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Não renderiza nada se o modal estiver fechado e não estiver animando
  if (!isOpen && !isAnimating) return null;

  return (
    // Container principal com overlay e animação de fade
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Overlay com fundo escuro e clique para fechar */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
        onClick={onClose}
      />
      {/* Container do modal com animação de slide e tamanho responsivo */}
      <div 
        className={`relative bg-white rounded-lg shadow-xl w-full mx-4 sm:mx-auto sm:w-[95%] md:w-[85%] lg:w-3/4 xl:w-2/4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="p-4 sm:p-6">
          {/* Cabeçalho do modal com título e botão de fechar */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Carrinho de Compras</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Conteúdo condicional baseado no estado do carrinho */}
          {cart.length === 0 ? (
            <p className="text-center text-gray-600 py-8">Seu carrinho está vazio</p>
          ) : (
            <>
              {/* Lista de itens do carrinho */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-4"
                  >
                    {/* Container da imagem e informações do produto */}
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-black rounded-md overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105 mix-blend-normal"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(item.product.price)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Controles de quantidade e botão remover */}
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md transition-colors duration-200"
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rodapé do modal com total e botões de ação */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(total)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Limpar Carrinho
                  </button>
                  <button
                    onClick={() => {
                      alert('Compra finalizada com sucesso!');
                      onClose();
                    }}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 