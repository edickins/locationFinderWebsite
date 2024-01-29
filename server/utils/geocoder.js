const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCDER_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
