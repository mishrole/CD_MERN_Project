const { User } = require('./../models/user.model');
const jwt = require('jsonwebtoken');
// Dotenv Config
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

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

      return res.status(201).json({
        message: 'User created successfully',
        user: payload
      });

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

const getCurrentUser = (req, res) => {
  const usertoken = req.cookies.usertoken;
  const decodedToken = jwt.decode(usertoken, secretkey);

  User.findOne({ _id: decodedToken.id })
  .then(data =>
    res.status(200).json({
      user: data
    })
  )
  .catch(err =>
    res.status(400).json({
      message: `Error getting user wit Id ${decodedToken.id}`,
      error: err
    })
  );
}

const editUser = (req, res) => {
  const { firstname, lastname } = req.body;
  const usertoken = req.cookies.usertoken;
  const decodedToken = jwt.decode(usertoken, secretkey);

  if (!firstname || !lastname) {
    return res.status(406).json({
      message: 'Please provide firstname and lastname'
    });
  } else {
    User.findOneAndUpdate({ _id: decodedToken.id }, { firstname, lastname }, {returnDocument: 'after'})
    .then(data => {
      const payload = {
        id: data._id,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role
      };

      const expiration = {
        expiresIn: '20m'
      }

      // * Response with jwt token
      const newJwt = jwt.sign(payload, secretkey, expiration);
      res.cookie('usertoken', newJwt, secretkey, {
        httpOnly: true
      }).json({ message: 'User updated successfully', user: data });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error getting user with Id ${decodedToken.id}`,
        error: err
      })
    );
  }
}

const UserController = {
  getAllUsers,
  createUser,
  findUser,
  editUser,
  getCurrentUser
}

module.exports = UserController;