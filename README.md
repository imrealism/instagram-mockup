# Instagram Clone

A full-stack Instagram clone built with React, Node.js, and Tailwind CSS. This project is a mockup that implements core Instagram features with mock data.

## Features

### Authentication
- User registration and login
- Protected routes
- Session management

### Feed
- Scrollable post feed
- Like and comment on posts
- Save posts to collections
- Rich media support

### Stories
- View user stories
- Create new stories
- Story progression
- Interactive story viewer

### Posts
- Create new posts
- Add captions
- Like and comment
- Save posts to collections
- Post detail view

### Profile
- User profiles
- Edit profile information
- Grid view of user posts
- Saved posts collections

### Explore
- Discover new posts
- Search users and hashtags
- Popular posts grid
- Suggested users

### Direct Messages
- Chat interface
- Send and receive messages
- Real-time messaging (mock)
- Conversation list

### Notifications
- Activity notifications
- Like and comment alerts
- Follow notifications
- Mark as read functionality

### Settings
- Edit profile
- Change password
- Privacy settings
- Notification preferences

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Heroicons
- Date-fns

### Backend
- Node.js
- Express.js
- Mock data store
- JWT authentication
- CORS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/instagram-mockup.git
cd instagram-mockup
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Project Structure

```
instagram-mockup/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # Context providers
│   │   ├── hooks/           # Custom hooks
│   │   └── assets/          # Static assets
│   └── public/              # Public assets
│
└── backend/                 # Node.js backend application
    ├── src/
    │   ├── controllers/     # Request handlers
    │   ├── routes/          # API routes
    │   ├── middleware/      # Custom middleware
    │   └── data/            # Mock data storage
    └── config/              # Configuration files
```

## API Documentation

### Authentication
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout

### Posts
- GET /api/posts
- POST /api/posts
- GET /api/posts/:id
- POST /api/posts/:id/like
- POST /api/posts/:id/comment

### Stories
- GET /api/stories
- POST /api/stories
- GET /api/stories/:id

### Users
- GET /api/users/:username
- PUT /api/users/profile
- GET /api/users/suggested

### Messages
- GET /api/messages
- POST /api/messages
- GET /api/messages/:id

### Notifications
- GET /api/notifications
- PUT /api/notifications/:id/read
- PUT /api/notifications/read-all

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Instagram for inspiration
- React and Node.js communities
- Tailwind CSS team
- All contributors
