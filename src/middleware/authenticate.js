const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = { userId: decoded.userId };
    next();
  });
}

module.exports = authenticate;
