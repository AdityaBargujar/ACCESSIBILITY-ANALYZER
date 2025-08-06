const express = require('express');
const router = express.Router();
const { scanPage } = require('../controllers/scanController');

router.post('/scan', scanPage);

module.exports = router;
