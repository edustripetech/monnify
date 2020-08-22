const base64 = require('base-64');
require('dotenv').config();

const { MON_API_KEY, MON_SECRET } = process.env;

module.exports = {
  // monnifyApiKey: MON_API_KEY,
  // monnifySecretKey: MON_SECRET,
  monnifyBase64AuthToken: base64.encode(MON_API_KEY + ':' + MON_SECRET),
};
