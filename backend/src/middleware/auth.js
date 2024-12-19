// Middleware to check if user is authenticated
const protected = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  // In a real app, verify JWT token here
  const token = authHeader.split(' ')[1];
  
  try {
    // For mock purposes, we'll just check if token exists
    if (!token) {
      throw new Error('Invalid token');
    }

    // In a real app, decode token and attach user to request
    req.user = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com'
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

module.exports = { protected };