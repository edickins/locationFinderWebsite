const express = require('express');
const router = express.Router();
const {
  getFacilities,
  getFacility,
  createFacility,
  updateFacility,
  deleteFacility
} = require('../controllers/facilities');

/*NO PARAM*/
router.route('/').get(getFacilities).post(createFacility);

/*WITH PARAM*/
router
  .route('/:id')
  .get(getFacility)
  .put(updateFacility)
  .delete(deleteFacility);

module.exports = router;
