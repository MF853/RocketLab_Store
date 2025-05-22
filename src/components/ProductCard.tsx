import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2 flex-grow">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(product.price)}
        </span>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
        </button>
      </div>
      <span className="text-sm text-gray-500 mt-2">
        Em estoque: {product.stock}
      </span>
    </div>
  );
}; 