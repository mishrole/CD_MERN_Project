const { User } = require('./../models/user.model');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { email, password, firstname, lastname, role, confirm } = req.body;

  if (!email || !password || !firstname || !lastname || !confirm) {
    return res.status(406).json({
      message: 'Please provide email, password, confirm, firstname, and lastname'
    });
  } else {

    const newUser = {
        email,
        password,
        firstname,
        lastname,
        role,
        confirm
    }
    
    User.create(newUser)
    .then(result => {
      const payload = {
        id: result._id,
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
        role: result.role
      };

      const expiration = {
        expiresIn: '20m'
      }

      // * Response with jwt token
      jwt.sign(payload, secretkey, expiration, (err, token) =>
        res.status(201).json({ token })
      )

    })
    .catch(err => {

      console.log(err);

      if (err.name === 'MongoError' || err.code === 11000) {
        let errors = {
          'email': {
            'message': `User email ${email} already exists`,
          }
        };

        return res.status(400).json({
          message: 'Error creating user',
          error: {
            errors: errors || err
          }
        })
      } else {
        return res.status(400).json({
          message: 'Error creating user',
          error: err
        })
      }
    });
  }

}

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
  .then(result => {
    if (!result) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    bcrypt.compare(password, result.password)
    .then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid credentials'
        });
      }

      const payload = {
        id: result._id,
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
        role: result.role
      }

      
      const expiration = {
        expiresIn: '20m'
      }

      // * Response with jwt token
      jwt.sign(payload, secretkey, expiration, (err, token) =>
        res.status(200).json({
          message: `Welcome back ${result.firstname}`,
          token
        })
      )
    });
  });
}

const AuthController = {
  register,
  login
}

module.exports = AuthController;
