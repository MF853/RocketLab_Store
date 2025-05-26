import { useState } from 'react';
import { usePriceAlert } from '../contexts/PriceAlertContext';
import { PriceAlertModal } from './PriceAlertModal';

interface PriceAlertButtonProps {
  productId: number;
  productName: string;
  currentPrice: number;
}

export function PriceAlertButton({ productId, productName, currentPrice }: PriceAlertButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasAlert } = usePriceAlert();

  const hasActiveAlert = hasAlert(productId);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2 ${
          hasActiveAlert
            ? 'bg-[#50fa7b] text-[#282a36] hover:bg-[#69ff97]'
            : 'bg-[#44475a] text-[#f8f8f2] hover:bg-[#6272a4]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
          />
        </svg>
        {hasActiveAlert ? 'Alerta Ativo' : 'Definir Alerta de Preço'}
      </button>

      <PriceAlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
        productName={productName}
        currentPrice={currentPrice}
      />
    </>
  );
} 