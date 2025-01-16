const express = require('express');
const router = express.Router();

const {
  getGoogleAddressComponents
} = require('../controllers/googleAddressComponents');

router.route('/').post(getGoogleAddressComponents);

module.exports = router;
