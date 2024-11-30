const mockUsers = [];

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;
    
    const user = mockUsers.find(u => u.email === email);
    if (user && user.password === password) {
      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  },

  signup: (req, res) => {
    const { email, password, username } = req.body;
    
    if (mockUsers.find(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      username
    };
    
    mockUsers.push(newUser);

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }
    });
  },

  logout: (req, res) => {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }
};

module.exports = authController;