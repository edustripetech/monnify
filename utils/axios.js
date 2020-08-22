const axios = require('axios').default;
const config = require('../config');

// A simple function to get access token from monnify
function getAccessToken() {
  // Create a config object for authenticating with monnify's API
  const authConfig = {
    url: '/auth/login',
    method: 'post',
    baseURL: 'https://sandbox.monnify.com/api/v1',
    headers: { Authorization: 'Basic ' + config.monnifyBase64AuthToken },
  }

  const token = new Promise(function (resolve, reject) {
    axios(authConfig)
      .then(function ({ data }) {
        return resolve(data.responseBody.accessToken);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
  return token;
}

function getAxiosInstance() {
  // Create a new axios instance
  const instance = axios.create({
    baseURL: 'https://sandbox.monnify.com/api/v1',
  });

  return new Promise(function (resolve, reject) {
    // Get auth token from monnify and attach it to the axios instance's header for subsequent requests
    getAccessToken()
      .then(function (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`
        return resolve(instance);
      })
      .catch(function (err) {
        return reject(err);
      })
  });
}

// Export the axios instance
module.exports = getAxiosInstance;
