var express = require("express");
var controller = require('../controllers/revision.server.controller');
var router = express.Router();

router.get('/', controller.getHighestRevision2)
router.get('/getStatus', controller.getStatus)
router.get('/getHighestRevid', controller.getHighestRevid)
router.get('/getLowestRevid', controller.getLowestRevid)
router.get('/getIndividualTitle', controller.getIndividualTitle)



//router.get('/getHighestRevision2', controller.getHighestRevision2)

module.exports = router;
