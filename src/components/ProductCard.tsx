import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Hook personalizado para acessar as funções do carrinho
  const { addToCart } = useCart();

  return (
    // Container do card com efeito de elevação no hover
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Container da imagem com fundo preto e efeito de zoom */}
      <div className="relative w-full h-40 sm:h-48 mb-4 bg-black rounded-md overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain rounded-md mix-blend-normal transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback para imagem placeholder em caso de erro
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </div>
      {/* Título do produto com altura mínima fixa e limite de 2 linhas */}
      <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">{product.name}</h3>
      {/* Descrição com limite de 3 linhas */}
      <p className="text-gray-600 text-sm sm:text-base mb-2 flex-grow line-clamp-3">{product.description}</p>
      {/* Container de preço e botão com layout responsivo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mt-4">
        {/* Preço formatado em BRL */}
        <span className="text-lg sm:text-xl font-bold text-blue-600">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(product.price)}
        </span>
        {/* Botão de adicionar ao carrinho com estado disabled */}
        <button
          onClick={() => addToCart(product)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
        </button>
      </div>
      {/* Indicador de estoque */}
      <span className="text-sm text-gray-500 mt-2">
        Em estoque: {product.stock}
      </span>
    </div>
  );
}; 