const Location = require('../models/Location');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const axios = require('axios');
const { getNextLocationId } = require('../utils/getNextLocationId');

// @desc Get all locations
// @route GET /api/v1/locations
// @access Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  try {
    const locations = await Location.find().populate('facilities');
    res
      .status(200)
      .json({ success: true, count: locations.length, locations: locations });
  } catch (error) {
    next(error);
  }
});

// @desc Get a single location
// @route GET /api/v1/locations/:id
// @access Public
exports.getLocation = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  try {
    const location = await Location.findOne({ id: req.params.id });

    if (!location) {
      return next(
        new ErrorResponse(
          `Location not found with an id of ${req.params.id}`,
          400
        )
      );
    }

    res.status(200).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
});

// @desc Create a location
// @route POST /api/v1/locations
// @access Private Admin
exports.createLocation = asyncHandler(async (req, res, next) => {
  try {
    // create a new document using fields from the req.body
    const location = new Location({
      long_name: req.long_name,
      alphabetical_name: req.alphabetical_name,
      location: req.location
    });

    const address = encodeURIComponent(req.body.postal_address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCDER_KEY}`;
    try {
      const result = await axios.get(url);
      const apiResponse = result.data;

      const location = new Location({
        ...req.body,
        ...apiResponse.results[0]
      });

      const newLocationDocument = await location.save();

      res.status(201).json({ success: true, data: newLocationDocument });
    } catch (error) {
      res.status(500).json({ success: false, msg: error });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }

  next();
});

// @desc Update a location
// @route PUT /api/v1/locations:id
// @access Private Admin
exports.updateLocation = (req, res, next) => {
  res
    .status(201)
    .json({ sucess: true, msg: `Updated location with id ${req.params.id}` });
};

// @desc Delete a location
// @route DELETE /api/v1/locations:id
// @access Private Admin
exports.deleteLocation = (req, res, next) => {
  res
    .status(200)
    .json({ sucess: true, msg: `Deleted location with id ${req.params.id}` });
};
