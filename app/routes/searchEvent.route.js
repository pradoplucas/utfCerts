const express = require('express');
var router = express.Router();

const controller = require('../controllers/searchEvent.controller');

router.get('/searchEvent', controller.get);

router.get('/searchEvent/eventSearch/:eventName', controller.getEventSearch);
router.get('/searchEvent/eventData/:eventId', controller.getEventData);

router.get('/searchEvent/download/:arrayCodes', controller.getEventDownload);

module.exports = router;
