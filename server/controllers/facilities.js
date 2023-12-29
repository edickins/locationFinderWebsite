const Facility = require('../models/Facility');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all facilities
// @route GET /api/v1/facilities
// @access Public
exports.getFacilities = asyncHandler(async (req, res, next) => {
  try {
    const facilities = await Facility.find();
    res.status(200).json({
      success: true,
      count: facilities.length,
      facilities: facilities
    });
  } catch (error) {
    next(error);
  }
});

// @desc Get a single facility
// @route GET /api/v1/facilities/:id
// @access Public
exports.getFacility = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  try {
    const facility = await Facility.findOne({ id: req.params.id });

    if (!facility) {
      return next(
        new ErrorResponse(
          `Facility not found with an id of ${req.params.id}`,
          400
        )
      );
    }

    res.status(200).json({ success: true, data: facility });
  } catch (error) {
    next(error);
  }
});

// @desc Create a facility
// @route POST /api/v1/facilities
// @access Private Admin
exports.createFacility = asyncHandler(async (req, res, next) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({ success: true, msg: facility });
  } catch (error) {
    res.status(400).json({ success: false, msg: error });
  }
});

// @desc Update a facility
// @route PUT /api/v1/facilities:id
// @access Private Admin
exports.updateFacility = (req, res, next) => {
  res
    .status(201)
    .json({ sucess: true, msg: `Updated facility with id ${req.params.id}` });
};

// @desc Delete a facility
// @route DELETE /api/v1/facilities:id
// @access Private Admin
exports.deleteFacility = (req, res, next) => {
  res
    .status(200)
    .json({ sucess: true, msg: `Deleted facility with id ${req.params.id}` });
};
