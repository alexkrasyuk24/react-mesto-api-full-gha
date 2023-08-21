const { config } = require('dotenv');

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const { SICRET_KEY_SERVER = 'dev-secret' } = process.env;
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  config();
}

module.exports = {
  SICRET_KEY_SERVER,
  URL_REGEX,
  NODE_ENV,
};
