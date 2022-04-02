const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

const validateToken = (req, res, next) => {
  const token = request.headers['api-token'];

  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      return res.status(406).json({ message: 'Unauthorized' });
    } else {
      next();
    }
  });
}

module.exports = validateToken;