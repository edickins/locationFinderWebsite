const Location = require('../models/Location');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const axios = require('axios');
const { getNextLocationId } = require('../utils/getNextLocationId');

// @desc Get all locations
// @route GET /api/v1/locations
// @access Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  const params = new URLSearchParams(req.query);

  const offset = parseInt(params.get('offset')) || 0;
  const limit = parseInt(params.get('limit'));
  try {
    const query = Location.find().populate('facilities').skip(offset);

    // Conditionally apply limit if it is defined
    if (limit) {
      query.limit(limit);
    }

    const locations = await query;

    const totalCount = await Location.countDocuments();
    res.status(200).json({
      success: true,
      count: locations.length,
      totalCount,
      locations
    });
  } catch (error) {
    next(error);
  }
});

async function getLocationNames() {
  try {
    const allLocations = await Location.find({}, 'id long_name');
    const locationsList = [];

    allLocations.forEach(location => {
      locationsList.push({ id: location.id, long_name: location.long_name }); // Construct key-value pairs
    });

    return locationsList; // This will return a Promise that resolves to locationsList
  } catch (error) {
    throw error; // Rethrow the error to be handled by the calling function
  }
}

// @desc Get a single location
// @route GET /api/v1/locations/:id
// @access Public
exports.getLocation = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);

  try {
    const locationPromise = Location.findOne({ id: req.params.id }).populate(
      'facilities'
    );
    const allLocationsPromise = getLocationNames();

    const [location, locationNames] = await Promise.all([
      locationPromise,
      allLocationsPromise
    ]);

    if (!location || !locationNames) {
      return next(
        new ErrorResponse(
          `Location not found with an id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: location, locationNames });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse('An error occurred while fetching locations', 500));
  }
});

// @desc Create a location
// @route POST /api/v1/locations
// @access Private Admin
exports.createLocation = asyncHandler(async (req, res, next) => {
  try {
    const address = encodeURIComponent(req.body.postal_address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCDER_KEY}`;
    try {
      const result = await axios.get(url);
      const apiResponse = result.data;

      // create a new document destructuring fields from the req.body
      // add all other fields from the map api response
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
