import { FC } from 'react';
import { Alert } from 'react-bootstrap';
import { useNotificationContext } from '../context/notificationContext';

const Notification: FC = () => {
  const { notification, removeNotification } = useNotificationContext();

  return (
    <Alert
      dismissible
      show={!!notification}
      onClose={removeNotification}
      variant={notification?.type}
      className="notification"
    >
      {notification?.message}
    </Alert>
  );
};

export default Notification;
