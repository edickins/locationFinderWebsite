// import mongoose Location schema
const Location = require('../models/Location');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const getNextLocationId = require('../utils/getNextLocationId');

exports.getNextLocationId = asyncHandler(async (req, res, next) => {
  console.log('getNextLocationId');
  try {
    const nextId = await getNextLocationId(); // Ensure this resolves
    res.status(201).json({ success: true, data: { nextId } });
  } catch (error) {
    console.error('Error in getNextLocationId:', error);
    next(new ErrorResponse('Failed to get next location ID', 500));
  }
});
