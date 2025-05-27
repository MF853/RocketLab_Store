import { useWishlist } from '../contexts/WishlistContext';
import type { Product } from '../types/Product';

interface WishlistToggleProps {
  product: Product;
  className?: string;
}

export function WishlistToggle({ product, className = '' }: WishlistToggleProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`absolute z-10 p-2 rounded-full bg-[#282a36]/80 hover:bg-[#282a36] transition-all duration-300 group ${className}`}
      aria-label={isWishlisted ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-colors ${
          isWishlisted ? 'text-[#ff5555]' : 'text-[#f8f8f2] group-hover:text-[#ff5555]'
        }`}
        fill={isWishlisted ? 'currentColor' : 'none'}
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
    </button>
  );
} 