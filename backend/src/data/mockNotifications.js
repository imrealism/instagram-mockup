const mockNotifications = [
  {
    id: 1,
    type: 'like',
    user: {
      id: 2,
      username: 'jane_smith',
      profilePicture: 'https://api.multiavatar.com/jane_smith.svg'
    },
    post: {
      id: 1,
      image: 'https://picsum.photos/600/600?random=1'
    },
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    type: 'follow',
    user: {
      id: 3,
      username: 'travel_enthusiast',
      profilePicture: 'https://api.multiavatar.com/travel_enthusiast.svg'
    },
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    type: 'comment',
    user: {
      id: 2,
      username: 'jane_smith',
      profilePicture: 'https://api.multiavatar.com/jane_smith.svg'
    },
    post: {
      id: 2,
      image: 'https://picsum.photos/600/600?random=2'
    },
    comment: 'This is amazing! 😍',
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    type: 'mention',
    user: {
      id: 4,
      username: 'photo_lover',
      profilePicture: 'https://api.multiavatar.com/photo_lover.svg'
    },
    post: {
      id: 3,
      image: 'https://picsum.photos/600/600?random=3'
    },
    comment: 'Hey @john_doe, check this out!',
    read: true,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

module.exports = mockNotifications;