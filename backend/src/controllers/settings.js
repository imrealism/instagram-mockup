const mockUsers = require('../data/mockUsers');

const settingsController = {
  getProfile: (req, res) => {
    const userId = req.user.id;
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove sensitive information
    const { password, ...profile } = user;

    res.json({
      success: true,
      profile
    });
  },

  updateProfile: (req, res) => {
    const userId = req.user.id;
    const { username, name, bio, website, email } = req.body;

    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if username is taken by another user
    if (username !== mockUsers[userIndex].username && 
        mockUsers.some(u => u.username === username)) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }

    // Update user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      username: username || mockUsers[userIndex].username,
      name: name || mockUsers[userIndex].name,
      bio: bio || mockUsers[userIndex].bio,
      website: website || mockUsers[userIndex].website,
      email: email || mockUsers[userIndex].email
    };

    const { password, ...updatedProfile } = mockUsers[userIndex];

    res.json({
      success: true,
      profile: updatedProfile
    });
  },

  updatePassword: (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    if (currentPassword !== user.password) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  },

  updatePrivacySettings: (req, res) => {
    const userId = req.user.id;
    const { isPrivate, showActivity } = req.body;

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update privacy settings
    user.settings = {
      ...user.settings,
      privacy: {
        isPrivate: isPrivate ?? user.settings?.privacy?.isPrivate ?? false,
        showActivity: showActivity ?? user.settings?.privacy?.showActivity ?? true
      }
    };

    res.json({
      success: true,
      privacySettings: user.settings.privacy
    });
  },

  getNotificationSettings: (req, res) => {
    const userId = req.user.id;
    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return default settings if none exist
    const defaultSettings = {
      pushEnabled: true,
      emailEnabled: true,
      notifications: {
        likes: true,
        comments: true,
        follows: true,
        mentions: true
      }
    };

    res.json({
      success: true,
      settings: user.settings?.notifications || defaultSettings
    });
  },

  updateNotificationSettings: (req, res) => {
    const userId = req.user.id;
    const { pushEnabled, emailEnabled, notifications } = req.body;

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update notification settings
    user.settings = {
      ...user.settings,
      notifications: {
        pushEnabled,
        emailEnabled,
        notifications: {
          ...user.settings?.notifications?.notifications,
          ...notifications
        }
      }
    };

    res.json({
      success: true,
      settings: user.settings.notifications
    });
  }
};

module.exports = settingsController;