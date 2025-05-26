import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export function Cart() {
  // Hook personalizado para acessar o estado e funções do carrinho
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    clearCart(); // Isso vai limpar tanto o estado quanto o localStorage
  };

  // Renderiza mensagem quando o carrinho está vazio
  if (cart.length === 0) {
    return (
      <div className="bg-[#282a36] rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300 border border-[#6272a4]">
        <p className="text-center text-[#6272a4]">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    // Container principal do carrinho lateral
    <div className="bg-[#282a36] rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300 border border-[#6272a4]">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#f8f8f2]">Carrinho de Compras</h2>
      {/* Lista de itens do carrinho */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col items-start gap-3 border-b border-[#6272a4] pb-4 transform transition-all duration-300 hover:bg-[#313442] rounded-md p-2"
          >
            {/* Container da imagem e informações do produto */}
            <div className="flex items-start gap-3 w-full" onClick={() => handleProductClick(item.product.id)}>
              <div className="w-16 h-16 bg-[#f8f8f2] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border border-[#6272a4]">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105 mix-blend-normal p-2"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-sm truncate text-[#f8f8f2] cursor-pointer hover:text-[#bd93f9]">{item.product.name}</h3>
                <p className="text-[#6272a4] text-sm">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(item.product.price)}
                </p>
              </div>
            </div>
            
            {/* Controles de quantidade e botão remover */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="bg-[#44475a] hover:bg-[#6272a4] text-[#f8f8f2] w-8 h-8 rounded-md transition-colors duration-200 flex items-center justify-center flex-shrink-0"
              >
                -
              </button>
              <span className="w-8 text-center flex-shrink-0 text-[#f8f8f2]">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="bg-[#44475a] hover:bg-[#6272a4] text-[#f8f8f2] w-8 h-8 rounded-md transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-[#ff5555] hover:text-[#ff79c6] transition-colors duration-200 ml-auto"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Rodapé com total e botões de ação */}
      <div className="mt-6 border-t border-[#6272a4] pt-4">
        <div className="flex justify-between text-lg sm:text-xl font-bold text-[#f8f8f2] mb-4">
          <span>Total:</span>
          <span className="text-[#50fa7b]">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(total)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={clearCart}
            className="w-full bg-[#44475a] text-[#f8f8f2] px-4 py-2 rounded-md hover:bg-[#6272a4] transition-all duration-300 transform hover:scale-105"
          >
            Limpar Carrinho
          </button>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#bd93f9] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#ff79c6] transition-all duration-300 transform hover:scale-105"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
} 