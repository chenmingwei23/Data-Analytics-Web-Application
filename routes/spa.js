var express = require("express");
var controller = require('../controllers/revision.server.controller');
var router = express.Router();

router.get('/', controller.getHighestRevision2)
router.get('/getStatus', controller.getStatus)


//router.get('/getHighestRevision2', controller.getHighestRevision2)

module.exports = router;
