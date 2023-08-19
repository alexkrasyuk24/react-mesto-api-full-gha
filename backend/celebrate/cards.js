const { celebrate, Joi } = require('celebrate');
const { imageUrlRegex } = require('../utils/errors/constans');

const celebrateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(imageUrlRegex),
  }),
});

const celebrateCardIdCelebrate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  celebrateCreateCard,
  celebrateCardIdCelebrate,
};
