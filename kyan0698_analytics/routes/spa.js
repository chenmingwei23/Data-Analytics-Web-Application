var express = require("express");
var controller = require('../controllers/revision.server.controller');
var router = express.Router();

// Overall Analytics Routing //

router.get('/', controller.findHighestRevisionCount)
router.get('/', controller.findLowestRevisionCount)
router.get('/', controller.findLargestUniqueUserRevisionCount)
router.get('/', controller.findSmallestUniqueUserRevisionCount)
router.get('/', controller.findLongestHistoryAgeCount)
router.get('/', controller.findShortestHistoryAgeCount)
router.get('/', controller.findTotalDistinctRegularUsers)
router.get('/', controller.findTotalDistinctAdminUsers)
router.get('/', controller.findTotalDistinctBotUsers)
router.get('/', controller.findTotalDistinctAnonUsers)
router.get('/', controller.findTotalDistinctUsers)
router.get('/', controller.findTotalRegularUserRevisions)
router.get('/', controller.findTotalAdminUserRevisions)
router.get('/', controller.findTotalBotUserRevisions)
router.get('/', controller.findTotalAnonUserRevisions)
router.get('/', controller.findTotalRevisions)
router.get('/', controller.findRegUserRevisionsPerYear)
router.get('/', controller.findAdminUserRevisionsPerYear)
router.get('/', controller.findBotUserRevisionsPerYear)
router.get('/', controller.findAnonUserRevisionsPerYear)
router.get('/', controller.findTotalRevisionsPerYear)

// Individual Analytics Routing //

router.get('/', controller.findArticleLatestRevision)
router.get('/', controller.findArticleRevisionCount)
router.get('/', controller.findArticleHighestRegularUserRevisionCount)
router.get('/', controller.findArticleTotalRegUserRevisions)
router.get('/', controller.findArticleTotalAdminUserRevisions)
router.get('/', controller.findArticleTotalBotUserRevisions)
router.get('/', controller.findArticleTotalAnonUserRevisions)
router.get('/', controller.findArticleTotalRevisions)
router.get('/', controller.findArticleRegUserRevisionsPerYear)
router.get('/', controller.findArticleAdminUserRevisionsPerYear)
router.get('/', controller.findArticleBotUserRevisionsPerYear)
router.get('/', controller.findArticleAnonUserRevisionsPerYear)
router.get('/', controller.findArticleTotalRevisionsPerYear)
router.get('/', controller.findArticleUserRevisionCountPerYear)

// Author Analytics Routing //

router.get('/', controller.findAuthorArticleRevisionCount)
router.get('/', controller.findAuthorArticleRevisionTimestamp)

router.get('/getStatus', controller.getStatus)
module.exports = router;