const { errorStatuses } = require('./constans');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = errorStatuses.notFound;
  }
}

module.exports = { NotFoundError };
