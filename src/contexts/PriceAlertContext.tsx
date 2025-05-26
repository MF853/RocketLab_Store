import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PriceAlert {
  productId: number;
  targetPrice: number;
  currentPrice: number;
  productName: string;
  dateCreated: string;
  expirationDate: string | null;
}

interface PriceAlertContextType {
  alerts: PriceAlert[];
  addAlert: (productId: number, targetPrice: number, productName: string, currentPrice: number) => void;
  removeAlert: (productId: number) => void;
  hasAlert: (productId: number) => boolean;
  getAlert: (productId: number) => PriceAlert | undefined;
}

const PriceAlertContext = createContext<PriceAlertContextType | undefined>(undefined);

export function PriceAlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    const savedAlerts = localStorage.getItem('priceAlerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  useEffect(() => {
    localStorage.setItem('priceAlerts', JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (productId: number, targetPrice: number, productName: string, currentPrice: number) => {
    const newAlert: PriceAlert = {
      productId,
      targetPrice,
      currentPrice,
      productName,
      dateCreated: new Date().toISOString(),
      expirationDate: null // Pode ser implementado posteriormente
    };

    setAlerts(currentAlerts => {
      const existingAlertIndex = currentAlerts.findIndex(alert => alert.productId === productId);
      if (existingAlertIndex >= 0) {
        const updatedAlerts = [...currentAlerts];
        updatedAlerts[existingAlertIndex] = newAlert;
        return updatedAlerts;
      }
      return [...currentAlerts, newAlert];
    });
  };

  const removeAlert = (productId: number) => {
    setAlerts(currentAlerts => {
      const updatedAlerts = currentAlerts.filter(alert => alert.productId !== productId);
      localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts));
      return updatedAlerts;
    });
  };

  const hasAlert = (productId: number) => {
    return alerts.some(alert => alert.productId === productId);
  };

  const getAlert = (productId: number) => {
    return alerts.find(alert => alert.productId === productId);
  };

  return (
    <PriceAlertContext.Provider
      value={{
        alerts,
        addAlert,
        removeAlert,
        hasAlert,
        getAlert
      }}
    >
      {children}
    </PriceAlertContext.Provider>
  );
}

export function usePriceAlert() {
  const context = useContext(PriceAlertContext);
  if (context === undefined) {
    throw new Error('usePriceAlert must be used within a PriceAlertProvider');
  }
  return context;
} 