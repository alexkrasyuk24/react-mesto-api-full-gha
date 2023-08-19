const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { SECRET_KEY } = require('../utils/errors/constans');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const {
            _id, name, about, avatar, email,
          } = user;
          res.send({
            _id, name, about, avatar, email,
          });
        })
        .catch(next);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const {
    password,
    email,
  } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Пользователь не найден');
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Передан неверный логин или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            SECRET_KEY,
            { expiresIn: '3d' },
          );
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  getCurrentUser,
  login,
};
