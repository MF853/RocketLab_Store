import { useCart } from '../contexts/CartContext';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#44475a] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border border-[#6272a4] h-full flex flex-col">
      <div className="w-full h-64 bg-[#282a36] flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-[#f8f8f2] mb-2 truncate">{product.name}</h3>
        <p className="text-[#bd93f9] text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[#50fa7b]">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.price)}
            </span>
            <span className="text-sm text-[#6272a4]">
              {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="w-full bg-[#bd93f9] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#ff79c6] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
          </button>
        </div>
      </div>
    </div>
  );
}; 