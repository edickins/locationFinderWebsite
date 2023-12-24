const Location = require('../models/Location');

// @desc Get all locations
// @route GET /api/v1/locations
// @access Public
exports.getLocations = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'All locations' });
};

// @desc Get a single location
// @route GET /api/v1/locations/:id
// @access Public
exports.getLocation = (req, res, next) => {
  res
    .status(200)
    .json({ sucess: true, msg: `Show location with the id ${req.params.id}` });
};

// @desc Create a location
// @route POST /api/v1/locations
// @access Private Admin
exports.createLocation = async (req, res, next) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json({ success: true, msg: 'Location created' });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
};

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
