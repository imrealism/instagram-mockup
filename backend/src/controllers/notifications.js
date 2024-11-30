const mockNotifications = require('../data/mockNotifications');

const notificationsController = {
  getNotifications: (req, res) => {
    const userId = req.user.id;
    // In a real app, we would filter notifications for the current user
    // Here we'll just return all mock notifications
    
    res.json({
      success: true,
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.read).length
    });
  },

  markAsRead: (req, res) => {
    const { notificationId } = req.params;
    const notification = mockNotifications.find(
      n => n.id === parseInt(notificationId)
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.read = true;

    res.json({
      success: true,
      notification
    });
  },

  markAllAsRead: (req, res) => {
    mockNotifications.forEach(notification => {
      notification.read = true;
    });

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  }
};

module.exports = notificationsController;