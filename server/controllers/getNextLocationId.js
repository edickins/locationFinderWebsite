// import mongoose Location schema
const Location = require('../models/Location');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const getNextLocationId = require('../utils/getNextLocationId');

exports.getNextLocationId = asyncHandler(async (req, res, next) => {
  const nextId = await getNextLocationId();
  res.status(201).json({ success: true, data: { nextId } });
});
