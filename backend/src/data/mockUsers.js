const mockUsers = [
  {
    id: 1,
    username: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: 'https://api.multiavatar.com/john_doe.svg',
    bio: 'Photography enthusiast | Travel lover',
    website: 'www.johndoe.com',
    posts: [1, 4, 7],
    followers: [],
    following: []
  },
  {
    id: 2,
    username: 'jane_smith',
    name: 'Jane Smith',
    email: 'jane@example.com',
    profilePicture: 'https://api.multiavatar.com/jane_smith.svg',
    bio: 'Coffee addict ☕️ | Life explorer',
    website: 'www.janesmith.com',
    posts: [2, 5, 8],
    followers: [],
    following: []
  },
  {
    id: 3,
    username: 'travel_enthusiast',
    name: 'Alex Travel',
    email: 'alex@example.com',
    profilePicture: 'https://api.multiavatar.com/travel_enthusiast.svg',
    bio: 'Professional traveler 🌍 | 30+ countries',
    website: 'www.alextravel.com',
    posts: [3, 6, 9],
    followers: [],
    following: []
  }
];

module.exports = mockUsers;