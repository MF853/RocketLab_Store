import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface PurchaseConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  items: Array<{
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  total: number;
}

export const PurchaseConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  items,
  total
}: PurchaseConfirmationModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setShowSuccess(false);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setShowSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-[#282a36] p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto border border-[#6272a4]">
        {!showSuccess ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#f8f8f2]">Confirmar Compra</h2>
              <button
                onClick={onClose}
                className="text-[#ff79c6] hover:text-[#ff92d0] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-[#f8f8f2] font-semibold mb-2">Resumo do Pedido:</h3>
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 bg-[#44475a] p-4 rounded-lg">
                  <div className="w-16 h-16 flex-shrink-0 bg-[#f8f8f2] rounded-md overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-[#f8f8f2] font-semibold">{item.product.name}</h4>
                    <p className="text-[#6272a4] text-sm">
                      Quantidade: {item.quantity} x{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.product.price)}
                    </p>
                  </div>
                  <div className="text-[#50fa7b] font-semibold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#6272a4] pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#f8f8f2] font-semibold text-lg">Total:</span>
                <span className="text-[#50fa7b] text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(total)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="w-1/2 bg-[#44475a] text-[#f8f8f2] py-3 rounded-md hover:bg-[#6272a4] transition-colors font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  className="w-1/2 bg-[#50fa7b] text-[#282a36] py-3 rounded-md hover:bg-[#69ff93] transition-colors font-semibold"
                >
                  Confirmar Compra
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mb-4 text-[#50fa7b]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#f8f8f2] mb-2">Compra Realizada com Sucesso!</h2>
            <p className="text-[#6272a4]">Obrigado pela sua compra!</p>
          </div>
        )}
      </div>
    </div>
  );
}; 