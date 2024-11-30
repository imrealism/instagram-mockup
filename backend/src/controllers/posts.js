const mockPosts = require('../data/mockPosts');

const postsController = {
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

  getAllPosts: (req, res) => {
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