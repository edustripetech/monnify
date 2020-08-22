const axios = require('axios').default;
const config = require('../config');

// Create a new axios instance
const instance = axios.create({
  baseURL: 'https://sandbox.monnify.com/api/v1',
});

// Create a config object for authenticating with monnify's API
const authConfig = {
  url: '/auth/login',
  method: 'post',
  baseURL: 'https://sandbox.monnify.com/api/v1',
  headers: { Authorization: 'Basic ' + config.monnifyBase64AuthToken },
}

// Get auth token from monnify and attach it to the axios instance's header for subsequent requests
axios(authConfig).then(function ({ data }) {
  instance.defaults.headers.common.Authorization = `Bearer ${data.responseBody.accessToken}`
});

// Export the axios instance
module.exports = instance;
