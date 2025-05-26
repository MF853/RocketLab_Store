import { useState, useEffect } from 'react';
import { usePriceAlert } from '../contexts/PriceAlertContext';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  currentPrice: number;
}

export function PriceAlertModal({ isOpen, onClose, productId, productName, currentPrice }: PriceAlertModalProps) {
  const { addAlert, removeAlert, hasAlert, getAlert } = usePriceAlert();
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const existingAlert = getAlert(productId);
      if (existingAlert) {
        setTargetPrice(existingAlert.targetPrice.toString());
      } else {
        setTargetPrice('');
      }
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, productId, getAlert]);

  if (!isOpen && !isAnimating) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(targetPrice);
    if (!isNaN(price) && price > 0) {
      addAlert(productId, price, productName, currentPrice);
      onClose();
    }
  };

  const handleRemoveAlert = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeAlert(productId);
    onClose();
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const price = parseFloat(numbers) / 100;
    if (isNaN(price)) return '';
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) {
      setTargetPrice('');
      return;
    }
    const price = (parseFloat(value) / 100).toString();
    setTargetPrice(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-[#282a36] p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-[#6272a4]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#f8f8f2]">Definir Alerta de Preço</h2>
          <button
            onClick={onClose}
            className="text-[#ff79c6] hover:text-[#ff92d0] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-[#f8f8f2] font-semibold mb-2">{productName}</h3>
          <p className="text-[#6272a4]">
            Preço atual: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="targetPrice" className="block text-[#f8f8f2] mb-2">
              Preço desejado
            </label>
            <input
              type="text"
              id="targetPrice"
              value={formatCurrency(targetPrice)}
              onChange={handlePriceChange}
              className="w-full bg-[#44475a] text-[#f8f8f2] px-4 py-2 rounded-md border border-[#6272a4] focus:border-[#bd93f9] focus:outline-none"
              placeholder="R$ 0,00"
            />
          </div>

          <div className="flex gap-2">
            {hasAlert(productId) ? (
              <>
                <button
                  type="button"
                  onClick={handleRemoveAlert}
                  className="w-1/2 bg-[#ff5555] text-[#f8f8f2] px-4 py-2 rounded-md hover:bg-[#ff6e6e] transition-colors"
                >
                  Remover Alerta
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#50fa7b] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#69ff97] transition-colors"
                >
                  Atualizar
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#bd93f9] text-[#282a36] px-4 py-2 rounded-md hover:bg-[#ff79c6] transition-colors"
              >
                Definir Alerta
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 