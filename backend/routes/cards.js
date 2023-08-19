const express = require('express');

const cardsRouter = express.Router();
const {
  getCards,
  createCard,
  getCardById,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  celebrateCardIdCelebrate,
  celebrateCreateCard,
} = require('../celebrate/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrateCreateCard, createCard);
cardsRouter.get('/:cardId', celebrateCardIdCelebrate, getCardById);
cardsRouter.delete('/:cardId', celebrateCardIdCelebrate, deleteCardById);
cardsRouter.put('/:cardId/likes', celebrateCardIdCelebrate, likeCard);
cardsRouter.delete('/:cardId/likes', celebrateCardIdCelebrate, dislikeCard);

module.exports = { cardsRouter };
