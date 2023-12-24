const express = require('express');
const router = express.Router();

const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locations');

/*NO PARAM*/
router.route('/').get(getLocations).post(createLocation);

/*WITH PARAM*/
router
  .route('/:id')
  .get(getLocation)
  .put(updateLocation)
  .delete(deleteLocation);

module.exports = router;
