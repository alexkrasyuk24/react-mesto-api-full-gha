const { celebrate, Joi } = require('celebrate');
const { imageUrlRegex } = require('../utils/errors/constans');

const celebrateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(imageUrlRegex),
  }),
});

const celebrateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const celebrateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(imageUrlRegex),
  }),
});

const celebrateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  celebrateSignUp,
  celebrateSignIn,
  celebrateUpdateUser,
  celebrateUpdateAvatar,
  celebrateUserId,
};
