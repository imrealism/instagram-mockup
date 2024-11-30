const mockPosts = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'john_doe',
      profilePicture: 'https://api.multiavatar.com/john_doe.svg'
    },
    image: 'https://picsum.photos/600/600?random=1',
    caption: 'Beautiful sunset at the beach! 🌅',
    likes: 124,
    comments: [
      {
        id: 1,
        user: {
          id: 2,
          username: 'jane_smith'
        },
        text: 'Amazing view! 😍'
      }
    ],
    createdAt: '2024-11-30T08:00:00.000Z'
  },
  {
    id: 2,
    user: {
      id: 2,
      username: 'jane_smith',
      profilePicture: 'https://api.multiavatar.com/jane_smith.svg'
    },
    image: 'https://picsum.photos/600/600?random=2',
    caption: 'Coffee time ☕️ #morningvibes',
    likes: 89,
    comments: [],
    createdAt: '2024-11-30T07:30:00.000Z'
  },
  {
    id: 3,
    user: {
      id: 3,
      username: 'travel_enthusiast',
      profilePicture: 'https://api.multiavatar.com/travel_enthusiast.svg'
    },
    image: 'https://picsum.photos/600/600?random=3',
    caption: 'Exploring new places 🌎 #travel #adventure',
    likes: 256,
    comments: [
      {
        id: 2,
        user: {
          id: 1,
          username: 'john_doe'
        },
        text: 'Where is this? Looks amazing!'
      }
    ],
    createdAt: '2024-11-30T06:45:00.000Z'
  }
];

module.exports = mockPosts;