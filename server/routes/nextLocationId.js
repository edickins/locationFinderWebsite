const express = require('express');
const router = express.Router();
const { getNextLocationId } = require('../controllers/getNextLocationId');

router.route('/').get(getNextLocationId);

module.exports = router;
