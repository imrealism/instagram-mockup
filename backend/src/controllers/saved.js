const mockSavedPosts = require('../data/mockSavedPosts');
const mockPosts = require('../data/mockPosts');

const savedController = {
  getSavedPosts: (req, res) => {
    const userId = req.user.id;
    const userSaved = mockSavedPosts.get(userId) || [];

    // Get full post details for saved posts
    const savedPosts = userSaved.map(saved => ({
      ...saved,
      post: mockPosts.find(p => p.id === saved.postId)
    }));

    res.json({
      success: true,
      savedPosts
    });
  },

  savePost: (req, res) => {
    const userId = req.user.id;
    const { postId } = req.params;
    const { collectionName = 'All Posts' } = req.body;

    const userSaved = mockSavedPosts.get(userId) || [];

    // Check if already saved
    if (userSaved.some(s => s.postId === parseInt(postId))) {
      return res.status(400).json({
        success: false,
        message: 'Post already saved'
      });
    }

    // Add to saved posts
    const savedPost = {
      postId: parseInt(postId),
      savedAt: new Date().toISOString(),
      collectionName
    };

    userSaved.push(savedPost);
    mockSavedPosts.set(userId, userSaved);

    res.json({
      success: true,
      savedPost
    });
  },

  unsavePost: (req, res) => {
    const userId = req.user.id;
    const { postId } = req.params;

    const userSaved = mockSavedPosts.get(userId) || [];
    const updatedSaved = userSaved.filter(s => s.postId !== parseInt(postId));

    mockSavedPosts.set(userId, updatedSaved);

    res.json({
      success: true,
      message: 'Post unsaved successfully'
    });
  },

  getCollections: (req, res) => {
    const userId = req.user.id;
    const userSaved = mockSavedPosts.get(userId) || [];

    // Get unique collection names and post counts
    const collections = Array.from(new Set(
      userSaved.map(s => s.collectionName)
    )).map(name => ({
      name,
      count: userSaved.filter(s => s.collectionName === name).length
    }));

    res.json({
      success: true,
      collections
    });
  },

  createCollection: (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Collection name is required'
      });
    }

    // In a real app, we would store the collection in a database
    res.status(201).json({
      success: true,
      collection: {
        name,
        count: 0
      }
    });
  }
};

module.exports = savedController;