const mockUsers = require('../data/mockUsers');
const mockPosts = require('../data/mockPosts');

const profileController = {
  getProfile: (req, res) => {
    const { username } = req.params;
    const user = mockUsers.find(u => u.username === username);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userPosts = mockPosts.filter(post => post.user.username === username);

    res.json({
      success: true,
      profile: {
        ...user,
        postsCount: userPosts.length,
        followersCount: Math.floor(Math.random() * 1000),
        followingCount: Math.floor(Math.random() * 500),
        isFollowing: Math.random() > 0.5
      }
    });
  },

  getUserPosts: (req, res) => {
    const { username } = req.params;
    const userPosts = mockPosts.filter(post => post.user.username === username);

    res.json({
      success: true,
      posts: userPosts
    });
  },

  updateProfile: (req, res) => {
    const { bio, website, name } = req.body;
    const userId = req.user.id;

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.bio = bio || user.bio;
    user.website = website || user.website;
    user.name = name || user.name;

    res.json({
      success: true,
      user
    });
  },

  followUser: (req, res) => {
    const { userId } = req.params;
    
    res.json({
      success: true,
      message: `Successfully followed user ${userId}`
    });
  },

  unfollowUser: (req, res) => {
    const { userId } = req.params;
    
    res.json({
      success: true,
      message: `Successfully unfollowed user ${userId}`
    });
  }
};

module.exports = profileController;