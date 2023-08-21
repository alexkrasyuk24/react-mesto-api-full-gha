const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SICRET_KEY_SERVER } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Нужна авторизация.'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, SICRET_KEY_SERVER);
  } catch (err) {
    return next(new UnauthorizedError('Нужна авторизация.'));
  }
  req.user = payload;

  return next();
};
