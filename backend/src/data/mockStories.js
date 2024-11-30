const mockStories = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'john_doe',
      profilePicture: 'https://api.multiavatar.com/john_doe.svg'
    },
    stories: [
      {
        id: 1,
        type: 'image',
        url: 'https://picsum.photos/800/1200?random=1',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 2,
    user: {
      id: 2,
      username: 'jane_smith',
      profilePicture: 'https://api.multiavatar.com/jane_smith.svg'
    },
    stories: [
      {
        id: 2,
        type: 'image',
        url: 'https://picsum.photos/800/1200?random=2',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: 'image',
        url: 'https://picsum.photos/800/1200?random=3',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 23.5 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 3,
    user: {
      id: 3,
      username: 'travel_enthusiast',
      profilePicture: 'https://api.multiavatar.com/travel_enthusiast.svg'
    },
    stories: [
      {
        id: 4,
        type: 'image',
        url: 'https://picsum.photos/800/1200?random=4',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 23.75 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

module.exports = mockStories;