const mockPosts = require('../data/mockPosts');

const postsController = {
  getFeedPosts: (req, res) => {
    // In a real app, we would fetch posts based on user's following
    // and paginate the results
    res.json({
      success: true,
      posts: mockPosts
    });
  },

  likePost: (req, res) => {
    const { postId } = req.params;
    const post = mockPosts.find(p => p.id === parseInt(postId));

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Toggle like
    post.likes += 1;

    res.json({
      success: true,
      post
    });
  },

  addComment: (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const post = mockPosts.find(p => p.id === parseInt(postId));

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const newComment = {
      id: post.comments.length + 1,
      user: {
        id: req.user.id,
        username: req.user.username
      },
      text,
      createdAt: new Date().toISOString()
    };

    post.comments.push(newComment);

    res.status(201).json({
      success: true,
      comment: newComment
    });
  }
};

module.exports = postsController;