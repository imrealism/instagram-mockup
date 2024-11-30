// Store saved posts by user ID
const mockSavedPosts = new Map();

// Example saved posts for user 1
mockSavedPosts.set(1, [
  {
    postId: 2,
    savedAt: '2024-11-30T10:00:00.000Z',
    collectionName: 'Favorites'
  },
  {
    postId: 3,
    savedAt: '2024-11-30T11:00:00.000Z',
    collectionName: 'Travel'
  }
]);

module.exports = mockSavedPosts;