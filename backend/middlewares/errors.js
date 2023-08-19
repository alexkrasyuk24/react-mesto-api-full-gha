const { errorStatuses } = require('../utils/errors/constans');

const errorsMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  if (error.code === 11000) {
    res.status(errorStatuses.conflict).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Попробуйте позже, проблемы с сервером' : message,
  });
  next();
};

module.exports = { errorsMiddleware };
