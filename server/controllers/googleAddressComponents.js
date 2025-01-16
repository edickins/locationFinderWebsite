const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const axios = require('axios');

exports.getGoogleAddressComponents = asyncHandler(async (req, res, next) => {
  const { address } = req.body;
  console.log(address);
  const instance = axios.create({
    baseURL: 'https://maps.googleapis.com'
  });
  try {
    const response = await instance.get('/maps/api/geocode/json', {
      params: { address, key: process.env.GEOCDER_KEY }
    });
    // Send the response data back to the client
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching address components.' });
  }
});
