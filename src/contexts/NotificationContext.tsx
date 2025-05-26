import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { usePriceAlert } from './PriceAlertContext';
import productsData from '../data/products.json';

interface Notification {
  id: string;
  type: 'price_alert' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: {
    productId?: number;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const { alerts, removeAlert } = usePriceAlert();

  // Verifica os alertas de preço
  useEffect(() => {
    alerts.forEach(alert => {
      const product = productsData.products.find(p => p.id === alert.productId);
      if (product && product.price <= alert.targetPrice) {
        // Verifica se já existe uma notificação para este alerta
        const hasNotification = notifications.some(
          n => n.type === 'price_alert' && n.data?.productId === alert.productId
        );

        if (!hasNotification) {
          addNotification({
            type: 'price_alert',
            title: 'Alerta de Preço',
            message: `O produto ${product.name} atingiu o preço desejado!`,
            data: {
              productId: product.id
            }
          });
        }
      }
    });
  }, [alerts, notifications]);

  // Persiste as notificações no localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      read: false
    };

    setNotifications(current => [newNotification, ...current]);
  };

  const markAsRead = (id: string) => {
    setNotifications(current =>
      current.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(current => current.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification?.type === 'price_alert' && notification.data?.productId) {
      removeAlert(notification.data.productId);
    }
    setNotifications(current => current.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 