import { useWishlist } from '../contexts/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f8f8f2]">
          Lista de Desejos
        </h1>
        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="bg-[#ff5555] text-[#f8f8f2] px-4 py-2 rounded-md hover:bg-[#ff6e6e] transition-colors text-sm sm:text-base"
          >
            Limpar Lista
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-[#6272a4] mb-4"
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
          <h2 className="text-xl font-semibold text-[#f8f8f2] mb-2">
            Sua lista de desejos está vazia
          </h2>
          <p className="text-[#6272a4]">
            Adicione produtos à sua lista para acompanhá-los aqui
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 