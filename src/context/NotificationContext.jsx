import React, { createContext, useContext, useState } from 'react';

/**
 * Create a context for notifications.
 * @type {React.Context}
 */
const NotificationContext = createContext();

/**
 * Custom hook to use the NotificationContext.
 * @returns {Object} The context value containing notification functions.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(NotificationContext);

/**
 * NotificationProvider component - Provides the notification context and manages
 * notifications state. Displays notifications and allows adding/removing notifications.
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The children components that will have access to the notification context.
 * @returns {JSX.Element} The rendered provider component with notification display.
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Adds a new notification with a timeout for auto-removal.
   * @param {string} message - The notification message.
   * @param {string} [type='info'] - The type of notification (e.g., 'info', 'success', 'error').
   * @returns {void}
   */
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);

    setTimeout(() => {
      setNotifications(currentNotifications =>
        currentNotifications.filter(notification => notification.id !== id)
      );
    }, 4000);
  };

  /**
   * Removes a notification manually by ID.
   * @param {number} id - The ID of the notification to remove.
   * @returns {void}
   */
  const removeNotification = id => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      {/* Render notifications */}
      <div className="notification-container">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`notification ${notification.type}`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
