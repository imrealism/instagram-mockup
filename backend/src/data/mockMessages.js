const mockMessages = [
  {
    id: 1,
    participants: [
      {
        id: 1,
        username: 'john_doe',
        profilePicture: 'https://api.multiavatar.com/john_doe.svg'
      },
      {
        id: 2,
        username: 'jane_smith',
        profilePicture: 'https://api.multiavatar.com/jane_smith.svg'
      }
    ],
    messages: [
      {
        id: 1,
        senderId: 1,
        text: 'Hey, how are you?',
        timestamp: '2024-11-30T10:00:00.000Z'
      },
      {
        id: 2,
        senderId: 2,
        text: 'I\'m good! How about you?',
        timestamp: '2024-11-30T10:01:00.000Z'
      },
      {
        id: 3,
        senderId: 1,
        text: 'Doing great! Did you see my latest post?',
        timestamp: '2024-11-30T10:02:00.000Z'
      }
    ],
    lastMessage: {
      text: 'Doing great! Did you see my latest post?',
      timestamp: '2024-11-30T10:02:00.000Z'
    }
  },
  {
    id: 2,
    participants: [
      {
        id: 1,
        username: 'john_doe',
        profilePicture: 'https://api.multiavatar.com/john_doe.svg'
      },
      {
        id: 3,
        username: 'travel_enthusiast',
        profilePicture: 'https://api.multiavatar.com/travel_enthusiast.svg'
      }
    ],
    messages: [
      {
        id: 1,
        senderId: 3,
        text: 'Nice travel photos!',
        timestamp: '2024-11-30T09:00:00.000Z'
      },
      {
        id: 2,
        senderId: 1,
        text: 'Thanks! I loved that place',
        timestamp: '2024-11-30T09:01:00.000Z'
      }
    ],
    lastMessage: {
      text: 'Thanks! I loved that place',
      timestamp: '2024-11-30T09:01:00.000Z'
    }
  }
];

module.exports = mockMessages;