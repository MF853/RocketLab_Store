import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  // Hook personalizado para acessar o estado e funções do carrinho
  const { cart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();
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

  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    clearCart();
    onClose();
  };

  const handleProductClick = (productId: number) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-[#282a36] p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto border border-[#6272a4]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#f8f8f2]">Carrinho</h2>
          <button
            onClick={onClose}
            className="text-[#ff79c6] hover:text-[#ff92d0] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-[#f8f8f2] text-center py-4">Seu carrinho está vazio</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 bg-[#44475a] p-4 rounded-lg">
                  <div 
                    className="w-20 h-20 flex-shrink-0 cursor-pointer"
                    onClick={() => handleProductClick(item.product.id)}
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover rounded-md" />
                  </div>
                  <div className="flex-grow">
                    <h3 
                      className="text-[#f8f8f2] font-semibold cursor-pointer hover:text-[#bd93f9]"
                      onClick={() => handleProductClick(item.product.id)}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-[#6272a4] text-sm">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                      className="text-[#f8f8f2] hover:text-[#ff79c6] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-[#f8f8f2] w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-[#f8f8f2] hover:text-[#50fa7b] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[#6272a4] pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#f8f8f2] font-semibold">Total:</span>
                <span className="text-[#50fa7b] text-xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(total)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="w-1/2 bg-[#44475a] text-[#f8f8f2] py-2 rounded-md hover:bg-[#6272a4] transition-colors font-semibold"
                >
                  Limpar
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-1/2 bg-[#bd93f9] text-[#282a36] py-2 rounded-md hover:bg-[#ff79c6] transition-colors font-semibold"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 