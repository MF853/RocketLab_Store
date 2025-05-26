import { useCart } from '../contexts/CartContext';

export const Cart = () => {
  // Hook personalizado para acessar o estado e funções do carrinho
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  // Renderiza mensagem quando o carrinho está vazio
  if (cart.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300 border border-gray-700">
        <p className="text-center text-gray-400">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    // Container principal do carrinho lateral
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-300 border border-gray-700">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Carrinho de Compras</h2>
      {/* Lista de itens do carrinho */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col items-start gap-3 border-b border-gray-700 pb-4 transform transition-all duration-300 hover:bg-gray-700/50 rounded-md p-2"
          >
            {/* Container da imagem e informações do produto */}
            <div className="flex items-start gap-3 w-full">
              <div className="w-16 h-16 bg-gray-900 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105 mix-blend-normal p-2"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-sm truncate text-white">{item.product.name}</h3>
                <p className="text-gray-400 text-sm">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(item.product.price)}
                </p>
              </div>
            </div>
            
            {/* Controles de quantidade e botão remover */}
            <div className="flex flex-col w-full gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-md transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                >
                  -
                </button>
                <span className="w-8 text-center flex-shrink-0 text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-md transition-colors duration-200 flex items-center justify-center flex-shrink-0"
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200 ml-auto"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Rodapé com total e botões de ação */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-lg sm:text-xl font-bold text-white">
          <span>Total:</span>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(total)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={clearCart}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            Limpar Carrinho
          </button>
          <button
            onClick={() => alert('Compra finalizada com sucesso!')}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}; 