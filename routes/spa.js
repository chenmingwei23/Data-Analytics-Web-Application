var express = require("express");
var controller = require('../controllers/revision.server.controller');
var router = express.Router();



router.get('/getHighestRevid2', controller.getHighestRevision2)
router.get('/getLowestRevid2', controller.getLowestRevision2)

router.get('/getHighestRevid', controller.getHighestRevid)
router.get('/getLowestRevid', controller.getLowestRevid)

router.get('/getLargestGroup2', controller.getLargestGroup2)
router.get('/getSmallestGroup2', controller.getSmallestGroup2)

router.get('/getLargestGroup', controller.getLargestGroup)
router.get('/getSmallestGroup', controller.getSmallestGroup)

router.get('/getLongestHis', controller.getLongestHis)
router.get('/getShortestHis', controller.getShortestHis)

router.get('/getBar', controller.getBar)



//router.get('/getHighestRevision2', controller.getHighestRevision2)

module.exports = router;
