const { errorStatuses } = require('./constans');

const handleDefaultError = (res) => {
  res.status(errorStatuses.badRequest).send({ message: 'На сервере произошла ошибка' });
};

module.exports = { handleDefaultError };
