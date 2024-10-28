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
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001' // Set your base URL here
  });
  const { postal_address } = req.body;

  // Check for the required postal_address field
  if (!postal_address) {
    return next(new ErrorResponse('postal_address is required', 400));
  }

  const address = encodeURIComponent(req.body.postal_address);
  const googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCDER_KEY}`;
  try {
    const googleApiResponsePromise = axios.get(googleAddressURL);
    const nextLocationIdPromise = axiosInstance.get('/api/v1/nextlocationid');

    // Wait for both promises to resolve
    const [googleApiResponse, nextLocationId] = await Promise.all([
      googleApiResponsePromise,
      nextLocationIdPromise
    ]);

    if (googleApiResponse.data.results.length > 0) {
      const googleData = googleApiResponse.data.results[0];
      const { formatted_address, place_id, geometry, address_components } =
        googleData;

      const { nextId } = nextLocationId.data.data;

      // Create a new Location object
      const location = new Location({
        long_name: req.body.long_name || '', // Optional
        alphabetical_name: req.body.alphabetical_name || '', // Optional
        location: req.body.location || '', // Optional
        open_status: req.body.open_status || '', // Optional
        formatted_address,
        place_id,
        geometry,
        address_components,
        id: nextId,
        opening_hours: req.body.opening_hours || [], // Optional, default to empty array
        facility_ids: req.body.facility_ids || [], // Optional, default to empty array
        date_created: Date.now(),
        date_modified: Date.now(),
        isFavourite: req.body.isFavourite || false // Optional, default to false
      });

      // Save the location or perform other operations
      const newLocationDocument = await location.save();

      res
        .status(201)
        .json({ success: true, locationid: newLocationDocument.id });
    } else {
      // Handle the case where no results were returned
      next(new ErrorResponse('No location found', 404));
    }
  } catch (error) {
    console.error('Error in createLocation:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    next(new ErrorResponse('An error occurred while adding a location', 500));
  }
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
