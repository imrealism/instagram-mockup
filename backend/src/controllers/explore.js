const mockPosts = require('../data/mockPosts');
const mockUsers = require('../data/mockUsers');

const exploreController = {
  getExplorePosts: (req, res) => {
    // In a real app, we would use an algorithm to show relevant posts
    // Here we'll just shuffle the mock posts
    const shuffledPosts = [...mockPosts].sort(() => Math.random() - 0.5);

    res.json({
      success: true,
      posts: shuffledPosts
    });
  },

  getPostsByTag: (req, res) => {
    const { tag } = req.params;
    // Filter posts that include the tag in their caption
    const taggedPosts = mockPosts.filter(post =>
      post.caption.toLowerCase().includes(`#${tag.toLowerCase()}`)
    );

    res.json({
      success: true,
      tag,
      posts: taggedPosts
    });
  },

  getPopularPosts: (req, res) => {
    // Sort posts by likes count
    const popularPosts = [...mockPosts].sort((a, b) => b.likes - a.likes);

    res.json({
      success: true,
      posts: popularPosts
    });
  },

  getSuggestedUsers: (req, res) => {
    // In a real app, we would use an algorithm to suggest relevant users
    // Here we'll just return random users
    const suggestedUsers = [...mockUsers]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(user => ({
        id: user.id,
        username: user.username,
        name: user.name,
        profilePicture: user.profilePicture,
        // Mock follower count
        followers: Math.floor(Math.random() * 10000)
      }));

    res.json({
      success: true,
      users: suggestedUsers
    });
  }
};

module.exports = exploreController;