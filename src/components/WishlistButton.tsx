import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';

export function WishlistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleRemoveItem = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#44475a] text-[#f8f8f2] p-2 rounded-md hover:bg-[#6272a4] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff5555] text-[#f8f8f2] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:bg-transparent"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed sm:absolute inset-x-0 bottom-0 sm:bottom-auto sm:right-0 sm:inset-x-auto mt-2 w-full sm:w-96 bg-[#282a36] rounded-t-lg sm:rounded-lg shadow-xl z-50 border-t sm:border border-[#6272a4] max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#282a36] border-b border-[#6272a4] z-10">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg sm:text-xl font-bold text-[#f8f8f2]">Lista de Desejos</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="sm:hidden text-[#ff5555] hover:text-[#ff6e6e] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-[#6272a4]">
              {wishlist.length === 0 ? (
                <div className="p-4 text-[#6272a4] text-center">
                  Sua lista de desejos está vazia
                </div>
              ) : (
                <>
                  <div className="space-y-4 p-4">
                    {wishlist.map(product => (
                      <div
                        key={product.id}
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-4 bg-[#44475a] hover:bg-[#6272a4] p-3 rounded-lg cursor-pointer transition-colors group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-contain bg-white rounded-md"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="text-[#f8f8f2] font-medium text-sm">{product.name}</h4>
                          <p className="text-[#bd93f9] text-sm mt-1">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(product.price)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleRemoveItem(e, product.id)}
                          className="text-[#ff5555] hover:text-[#ff6e6e] transition-colors p-1 opacity-0 group-hover:opacity-100"
                          aria-label="Remover da lista de desejos"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="sticky bottom-0 bg-[#282a36] border-t border-[#6272a4] p-4">
                    <button
                      onClick={() => {
                        navigate('/wishlist');
                        setIsOpen(false);
                      }}
                      className="w-full bg-[#44475a] text-[#f8f8f2] px-4 py-3 sm:py-2 rounded-md hover:bg-[#6272a4] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      Ver Lista Completa
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 