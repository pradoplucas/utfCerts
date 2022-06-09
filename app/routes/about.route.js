const express = require('express');
var router = express.Router();

const controller = require('../controllers/about.controller');

router.get('/about', controller.get);

module.exports = router;
