import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotification();
  const navigate = useNavigate();

  const handleNotificationClick = (notificationId: string, productId?: number) => {
    markAsRead(notificationId);
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleRemoveAll = () => {
    // Remove cada notificação individualmente para garantir que os alertas de preço também sejam removidos
    [...notifications].forEach(notification => {
      removeNotification(notification.id);
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#44475a] text-[#f8f8f2] p-2 rounded-md hover:bg-[#6272a4] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff5555] text-[#f8f8f2] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:bg-transparent"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed sm:absolute inset-x-0 bottom-0 sm:bottom-auto sm:right-0 sm:inset-x-auto mt-2 w-full sm:w-96 bg-[#282a36] rounded-t-lg sm:rounded-lg shadow-xl z-50 border-t sm:border border-[#6272a4] max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#282a36] border-b border-[#6272a4] z-10">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg sm:text-xl font-bold text-[#f8f8f2]">Notificações</h3>
                  <div className="flex items-center gap-3">
                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs sm:text-sm text-[#bd93f9] hover:text-[#ff79c6] transition-colors whitespace-nowrap"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="sm:hidden text-[#ff5555] hover:text-[#ff6e6e] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-[#6272a4]">
              {notifications.length === 0 ? (
                <div className="p-4 text-[#6272a4] text-center">
                  Nenhuma notificação
                </div>
              ) : (
                <>
                  <div className="space-y-4 p-4">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`flex flex-col gap-3 border-b border-[#6272a4] pb-4 transform transition-all duration-300 rounded-md p-2 relative group ${
                          notification.read 
                            ? 'bg-[#282a36] hover:bg-[#313442]' 
                            : 'bg-[#44475a] hover:bg-[#313442]'
                        }`}
                      >
                        <div 
                          className="flex items-start gap-3 w-full cursor-pointer pr-8"
                          onClick={() => handleNotificationClick(notification.id, notification.data?.productId)}
                        >
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-[#ff5555] flex-shrink-0 mt-[10px]"></span>
                          )}
                          <div className="flex-grow min-w-0">
                            <p className={`font-semibold text-sm sm:text-base ${notification.read ? 'text-[#f8f8f2]' : 'text-[#bd93f9]'}`}>
                              {notification.title}
                            </p>
                            <p className="text-[#6272a4] text-xs sm:text-sm mt-1">{notification.message}</p>
                            <p className="text-[#6272a4] text-xs mt-2">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="absolute top-2 right-2 text-[#ff5555] hover:text-[#ff6e6e] transition-colors p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          aria-label="Remover notificação"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Rodapé com botão de limpar */}
                  <div className="sticky bottom-0 bg-[#282a36] border-t border-[#6272a4] p-4">
                    <button
                      onClick={handleRemoveAll}
                      className="w-full bg-[#44475a] text-[#f8f8f2] px-4 py-3 sm:py-2 rounded-md hover:bg-[#6272a4] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      Limpar Notificações
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 