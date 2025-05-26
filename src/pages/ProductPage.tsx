import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import productsData from '../data/products.json';

export function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const product = productsData.products.find(p => p.id === Number(id));

  const handleBuyNow = () => {
    alert('Compra finalizada com sucesso!');
    navigate('/');
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-[#f8f8f2]">Produto não encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[#f8f8f2] hover:text-[#bd93f9] transition-colors mb-8 bg-gray-800 rounded-md p-2 border border-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar
      </button>

      <div className="bg-[#44475a] rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna da Esquerda - Imagem e Informações */}
          <div className="space-y-8">
            {/* Nome do Produto */}
            <h1 className="text-4xl font-bold text-[#f8f8f2] text-center lg:text-left mb-8">{product.name}</h1>
            
            {/* Container da Imagem com Tamanho Fixo e Aspecto Quadrado */}
            <div className="aspect-square w-full max-w-[500px] mx-auto">
              <div className="bg-[#f8f8f2] rounded-lg p-8 w-full h-full">
                <div className="relative w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                </div>
              </div>
            </div>

            {/* Preço e Ações - Visível apenas em Mobile */}
            <div className="lg:hidden">
              <div className="bg-[#282a36] p-6 rounded-lg">
                <div className="space-y-6">
                  {/* Preço */}
                  <div className="text-4xl font-bold text-[#50fa7b] text-center">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.price)}
                  </div>

                  {/* Status do Estoque */}
                  <div className="text-[#f8f8f2] text-center">
                    {product.stock > 0 ? (
                      <span className="text-[#50fa7b]">{product.stock} unidades em estoque</span>
                    ) : (
                      <span className="text-[#ff5555]">Fora de estoque</span>
                    )}
                  </div>

                  {/* Botões de Ação */}
                  <div className="space-y-3">
                    {/* Botão Comprar Agora */}
                    <button
                      onClick={handleBuyNow}
                      disabled={product.stock === 0}
                      className="w-full bg-[#50fa7b] text-[#282a36] px-6 py-4 rounded-md hover:bg-[#69ff97] transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Comprar Agora
                    </button>

                    {/* Botão Adicionar ao Carrinho */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-[#bd93f9] text-[#282a36] px-6 py-4 rounded-md hover:bg-[#ff79c6] transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                      </svg>
                      {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição e Especificações */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-2">Descrição</h2>
                <p className="text-[#f8f8f2] text-lg">{product.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#f8f8f2] mb-4">Especificações Técnicas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="bg-[#282a36] p-4 rounded-lg">
                      <h3 className="text-[#bd93f9] font-medium mb-1">{key}</h3>
                      <p className="text-[#f8f8f2]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita - Preço e Ações (Visível apenas em Desktop) */}
          <div className="hidden lg:flex flex-col">
            <h1 className="text-4xl font-bold text-[#f8f8f2] invisible mb-8">Espaçador</h1>
            <div className="bg-[#282a36] p-6 rounded-lg">
              <div className="space-y-6">
                {/* Preço */}
                <div className="text-4xl font-bold text-[#50fa7b] text-center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)}
                </div>

                {/* Status do Estoque */}
                <div className="text-[#f8f8f2] text-center">
                  {product.stock > 0 ? (
                    <span className="text-[#50fa7b]">{product.stock} unidades em estoque</span>
                  ) : (
                    <span className="text-[#ff5555]">Fora de estoque</span>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3">
                  {/* Botão Comprar Agora */}
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="w-full bg-[#50fa7b] text-[#282a36] px-6 py-4 rounded-md hover:bg-[#69ff97] transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Comprar Agora
                  </button>

                  {/* Botão Adicionar ao Carrinho */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-[#bd93f9] text-[#282a36] px-6 py-4 rounded-md hover:bg-[#ff79c6] transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                    </svg>
                    {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 