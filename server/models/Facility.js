const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  short_name: { type: String, required: true },
  id: { type: String, required: true, unique: true }
});

module.exports = mongoose.model(`Facility`, FacilitySchema);
