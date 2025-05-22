import { useCart } from '../contexts/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-600">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(item.product.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded-md"
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(total)}
          </span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Limpar Carrinho
          </button>
          <button
            onClick={() => alert('Compra finalizada com sucesso!')}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}; 