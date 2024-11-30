import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const handleClick = async () => {
    if (!notification.read) {
      try {
        await axios.post(`http://localhost:3001/api/notifications/${notification.id}/read`);
        onMarkAsRead();
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const renderNotificationContent = () => {
    switch (notification.type) {
      case 'like':
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span>
            {' liked your post'}
          </>
        );
      case 'follow':
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span>
            {' started following you'}
          </>
        );
      case 'comment':
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span>
            {' commented: '}
            <span className="text-gray-500">{notification.comment}</span>
          </>
        );
      case 'mention':
        return (
          <>
            <span className="font-semibold">{notification.user.username}</span>
            {' mentioned you in a comment: '}
            <span className="text-gray-500">{notification.comment}</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Link
      to={notification.post ? `/p/${notification.post.id}` : `/profile/${notification.user.username}`}
      className={`block p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <img
          src={notification.user.profilePicture}
          alt={notification.user.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            {renderNotificationContent()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
        {notification.post && (
          <img
            src={notification.post.image}
            alt=""
            className="w-10 h-10 object-cover"
          />
        )}
      </div>
    </Link>
  );
};

export default NotificationItem;