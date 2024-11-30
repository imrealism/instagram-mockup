// Mock database for users
const users = [];

// Helper function to generate token (in real app, use JWT)
const generateToken = () => Math.random().toString(36).substring(2);

const authController = {
  register: (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // In real app, hash the password
      createdAt: new Date(),
      profilePicture: `https://api.multiavatar.com/${username}.svg`
    };

    users.push(newUser);

    // Generate token
    const token = generateToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profilePicture: newUser.profilePicture
      }
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken();

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  },

  logout: (req, res) => {
    // In a real app, invalidate the token
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  },

  getCurrentUser: (req, res) => {
    // In a real app, get user from token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Mock user response
    res.json({
      success: true,
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        profilePicture: 'https://api.multiavatar.com/testuser.svg'
      }
    });
  }
};

module.exports = authController;