const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

// ! Removed, causes Error: Route.get() required a callback function but got a [object Undefined] - express\lib\router\route.js:202
// ! module.exports = secretkey;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secretkey, (err, payload) => {
    if (err) {
      // * Unauthorized
      return res.status(401).json({
        message: 'Unauthorized access. Please login to continue.',
        verified: false
      });
    }

    next();
  });
}