import { useContext } from 'react';
import { NotificationContext } from '../context/notificationContext';

const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('NotificationContext must be initialized first');
  }

  return context;
};

export default useNotificationContext;
