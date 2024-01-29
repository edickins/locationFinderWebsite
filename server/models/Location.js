const mongoose = require('mongoose');

const IAddressComponentSchema = new mongoose.Schema({
  long_name: { type: String, required: true },
  short_name: { type: String, required: true },
  types: [String]
});

const ILatLng = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const IViewport = new mongoose.Schema({
  northeast: { type: ILatLng, required: true },
  southwest: { type: ILatLng, required: true }
});

const IGeometrySchema = new mongoose.Schema({
  bounds: { type: IViewport, required: false },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  location_type: { type: String, required: false },
  viewport: { type: IViewport, required: false }
});

const IFacility = new mongoose.Schema({
  full_name: { type: String, required: true },
  short_name: { type: String, required: true },
  id: { type: String, required: true }
});

const LocationSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  long_name: { type: String, required: true },
  alphabetical_name: { type: String, required: true },
  open_status: { type: String, required: true },
  location: { type: String, required: true },
  address_components: [IAddressComponentSchema],
  formatted_address: { type: String, required: true },
  geometry: IGeometrySchema,
  place_id: { type: String, required: true },
  opening_hours: { type: [String], required: true },
  nearest_alternative: { type: String },
  facility_ids: [{ type: String, required: true }],
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date, default: Date.now },
  isFavourite: { type: Boolean, required: false, default: false }
});

LocationSchema.virtual('facilities', {
  ref: 'Facility',
  localField: 'facility_ids',
  foreignField: 'id',
  justOne: false
});

LocationSchema.set('toJSON', { virtuals: true });
LocationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Location', LocationSchema);
