const express = require('express');
var router = express.Router();

const controller = require('../controllers/searchOwner.controller');

router.get('/searchOwner', controller.get);

router.get('/searchOwner/ownerSearch/:ownerName', controller.getOwnerSearch);
router.get('/searchOwner/ownerData/:ownerId', controller.getOwnerData);

router.get('/searchOwner/download/:arrayCodes', controller.getOwnerDownload);

module.exports = router;
