const mockUsers = require('../data/mockUsers');
const mockPosts = require('../data/mockPosts');

const searchController = {
  search: (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.json({
        success: true,
        results: {
          users: [],
          posts: [],
          tags: []
        }
      });
    }

    // Search users
    const users = mockUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    // Search posts by caption
    const posts = mockPosts.filter(post =>
      post.caption.toLowerCase().includes(query.toLowerCase())
    );

    // Extract hashtags from posts
    const hashtagRegex = /#[\w]+/g;
    const tags = [...new Set(
      mockPosts
        .map(post => post.caption.match(hashtagRegex) || [])
        .flat()
        .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )];

    res.json({
      success: true,
      results: {
        users,
        posts,
        tags
      }
    });
  },

  searchTags: (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.json({
        success: true,
        tags: []
      });
    }

    // Extract and filter hashtags from all posts
    const hashtagRegex = /#[\w]+/g;
    const tags = [...new Set(
      mockPosts
        .map(post => post.caption.match(hashtagRegex) || [])
        .flat()
        .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )];

    res.json({
      success: true,
      tags
    });
  },

  searchPlaces: (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.json({
        success: true,
        places: []
      });
    }

    // Mock places data
    const mockPlaces = [
      { id: 1, name: 'New York, NY', type: 'city' },
      { id: 2, name: 'Times Square', type: 'landmark' },
      { id: 3, name: 'Central Park', type: 'park' }
    ];

    const places = mockPlaces.filter(place =>
      place.name.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      places
    });
  }
};

module.exports = searchController;