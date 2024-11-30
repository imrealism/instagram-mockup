const mockPosts = require('../data/mockPosts');

const postsController = {
  getPost: (req, res) => {
    const { postId } = req.params;
    const post = mockPosts.find(p => p.id === parseInt(postId));

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      post
    });
  },

  createPost: async (req, res) => {
    const { caption, imageUrl } = req.body;
    const userId = req.user.id;

    const newPost = {
      id: mockPosts.length + 1,
      user: {
        id: userId,
        username: req.user.username,
        profilePicture: `https://api.multiavatar.com/${req.user.username}.svg`
      },
      image: imageUrl || 'https://picsum.photos/600/600?random=' + Date.now(),
      caption,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    mockPosts.unshift(newPost);

    res.status(201).json({
      success: true,
      post: newPost
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

    // Toggle like (in a real app, we would track which users liked the post)
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
        username: req.user.username,
        profilePicture: `https://api.multiavatar.com/${req.user.username}.svg`
      },
      text,
      createdAt: new Date().toISOString()
    };

    post.comments.push(newComment);

    res.status(201).json({
      success: true,
      comment: newComment
    });
  },

  deleteComment: (req, res) => {
    const { postId, commentId } = req.params;
    const post = mockPosts.find(p => p.id === parseInt(postId));

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const commentIndex = post.comments.findIndex(c => c.id === parseInt(commentId));

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Only allow comment deletion by comment author
    if (post.comments[commentIndex].user.id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    post.comments.splice(commentIndex, 1);

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  }
};

module.exports = postsController;