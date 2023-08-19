const errorStatuses = {
  badRequest: 400,
  notFound: 404,
  serverError: 500,
  conflict: 409,
};

const SECRET_KEY = 'some-secret-key';

const imageUrlRegex = /https?:\/\/(www.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=,]*/;

module.exports = {
  errorStatuses,
  SECRET_KEY,
  imageUrlRegex,
};
