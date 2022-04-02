const { User } = require('./../models/user.model');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const getAllUsers = (req, res) => {
  User.find({}).sort({ type: 'asc' })
  .then(data =>
    res.status(200).json({
      users: data
    })
  )
  .catch(err => 
    res.status(400).json({
      message: 'Error getting all users',
      error: err
    })
  );
}

const createUser = (req, res) => {
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

const findUser = (req, res) => {
  User.findOne({ _id: req.params.id })
  .then(data =>
    res.status(200).json({
      user: data
    })
  )
  .catch(err =>
    res.status(400).json({
      message: `Error getting user wit Id ${req.params.id}`,
      error: err
    })
  );
}

const UserController = {
  getAllUsers,
  createUser,
  findUser
}

module.exports = UserController;