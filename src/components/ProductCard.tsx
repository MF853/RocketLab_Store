import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
import { PurchaseConfirmationModal } from './PurchaseConfirmationModal';
import { WishlistToggle } from './WishlistToggle';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = () => {
    setShowConfirmation(false);
    // You might want to add additional logic here, like saving the order to a database
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-[#44475a] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer relative group"
      >
        <div className="relative aspect-square bg-white">
          <WishlistToggle
            product={product}
            className="top-2 right-2 opacity-0 group-hover:opacity-100"
          />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-[#f8f8f2] font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[#bd93f9] text-xl font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-[#6272a4] text-sm line-through">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.oldPrice)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="bg-[#bd93f9] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#ff79c6] transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Adicionar ao Carrinho
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-[#50fa7b] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#69ff97] transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      <PurchaseConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmPurchase}
        items={[{ product, quantity: 1 }]}
        total={product.price}
      />
    </>
  );
} 