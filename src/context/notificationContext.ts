import {
  createContext,
  createElement,
  useState,
  useContext,
  useCallback,
} from 'react';

interface Props {
  children: React.ReactNode;
}

interface Notification {
  message: string;
  type: string;
}

interface NotificationContextType {
  notification: Notification | null;
  fireNotification: (notif: Notification) => void;
  removeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  fireNotification: () => {},
  removeNotification: () => {},
});

export const NotificationContextProvider = ({ children }: Props) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  return createElement(
    NotificationContext.Provider,
    {
      value: {
        notification,
        fireNotification: useCallback((notif: Notification) => {
          setNotification(notif);
        }, []),
        removeNotification: useCallback(() => {
          setNotification(null);
        }, []),
      },
    },
    children
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('NotificationContext must be initialized first');
  }

  return context;
};
