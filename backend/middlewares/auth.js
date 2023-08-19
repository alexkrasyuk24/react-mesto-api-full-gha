const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { SECRET_KEY } = require('../utils/errors/constans');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Нужна авторизация.'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Нужна авторизация.'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = {
  authMiddleware,
};
