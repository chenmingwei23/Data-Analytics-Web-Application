var Revision = require("../models/revision")


// Overall Analytics Controller //


module.exports.findHighestRevisionCount = function(req, res){
    
	Revision.findHighestRevisionCount(function(err, result){
		var title1 = result[0]['_id'];
		var count1 = result[0]['revisionCount'];
		var title2 = result[1]['_id'];
		var count2 = result[1]['revisionCount'];
		res.render('SPA.ejs',{HighestRevisionCount_title1: title1, HighestRevisionCount_count1: count1, HighestRevisionCount_title2: title2, HighestRevisionCount_count2: count2});
    })
}

module.exports.findLowestRevisionCount = function(req, res){
    
	Revision.findLowestRevisionCount(function(err, result){
		var title1 = result[0]['_id'];
		var count1 = result[0]['revisionCount'];
		var title2 = result[1]['_id'];
		var count2 = result[1]['revisionCount']; 
		res.render('SPA.ejs',{LowestRevisionCount_title1: title1, LowestRevisionCount_count1: count1, LowestRevisionCount_title2: title2, LowestRevisionCount_count2: count2});
    })
}

module.exports.findLargestUniqueUserRevisionCount = function(req, res){
    
	Revision.findLargestUniqueUserRevisionCount(function(err, result){
		var title1 = result[0]['_id'];
		var count1 = result[0]['uniqueUserCount'];
		var title2 = result[1]['_id'];
		var count2 = result[1]['uniqueUserCount']; 
		res.render('SPA.ejs',{findLargestUniqueUserRevisionCount_title1: title1, findLargestUniqueUserRevisionCount_count1: count1, findLargestUniqueUserRevisionCount_title2: title2, findLargestUniqueUserRevisionCount_count2: count2});
    })
}

module.exports.findSmallestUniqueUserRevisionCount = function(req, res){
    
	Revision.findSmallestUniqueUserRevisionCount(function(err, result){
		var title1 = result[0]['_id'];
		var count1 = result[0]['uniqueUserCount'];
		var title2 = result[1]['_id'];
		var count2 = result[1]['uniqueUserCount']; 
		res.render('SPA.ejs',{findSmallestUniqueUserRevisionCount_title1: title1, findSmallestUniqueUserRevisionCount_count1: count1, findSmallestUniqueUserRevisionCount_title2: title2, findSmallestUniqueUserRevisionCount_count2: count2});
    })
}

module.exports.findLongestHistoryAgeCount = function(req, res){
    
	Revision.findLongestHistoryAgeCount(function(err, result){
		var title1 = result[0]['title'];
		var age1 = result[0]['age'];
		var title2 = result[1]['title'];
		var age2 = result[1]['age']; 
		res.render('SPA.ejs',{findLongestHistoryAgeCount_title1: title1, findLongestHistoryAgeCount_age1: age1, findLongestHistoryAgeCount_title2: title2, findLongestHistoryAgeCount_age2: age2});
    })
}

module.exports.findShortestHistoryAgeCount = function(req, res){
    
	Revision.findShortestHistoryAgeCount(function(err, result){
		var title1 = result[0]['title'];
		var age1 = result[0]['age'];
		var title2 = result[1]['title'];
		var age2 = result[1]['age']; 
		res.render('SPA.ejs',{findShortestHistoryAgeCount_title1: title1, findShortestHistoryAgeCount_age1: age1, findShortestHistoryAgeCount_title2: title2, findShortestHistoryAgeCount_age2: age2});
    })
}

module.exports.findTotalDistinctRegularUsers = function(req, res){
    
	Revision.findTotalDistinctRegularUsers(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalDistinctRegularUsers_count: count});
    })
}

module.exports.findTotalDistinctAdminUsers = function(req, res){
    
	Revision.findTotalDistinctAdminUsers(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalDistinctAdminUsers_count: count});
    })
}

module.exports.findTotalDistinctBotUsers = function(req, res){
    
	Revision.findTotalDistinctBotUsers(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalDistinctBotUsers_count: count});
    })
}

module.exports.findTotalDistinctAnonUsers = function(req, res){
    
	Revision.findTotalDistinctAnonUsers(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalDistinctAnonUsers_count: count});
    })
}

module.exports.findTotalDistinctUsers = function(req, res){
    
	Revision.findTotalDistinctUsers(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalDistinctUsers_count: count});
    })
}
  
module.exports.findTotalRegularUserRevisions = function(req, res){
    
	Revision.findTotalRegularUserRevisions(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalRegularUserRevisions_count: count});
    })
}

module.exports.findTotalAdminUserRevisions = function(req, res){
    
	Revision.findTotalAdminUserRevisions(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalAdminUserRevisions_count: count});
    })
}

module.exports.findTotalBotUserRevisions = function(req, res){
    
	Revision.findTotalBotUserRevisions(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalBotUserRevisions_count: count});
    })
}

module.exports.findTotalAnonUserRevisions = function(req, res){
    
	Revision.findTotalAnonUserRevisions(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalAnonUserRevisions_count: count});
    })
}

module.exports.findTotalRevisions = function(req, res){
    
	Revision.findTotalRevisions(function(err, result){
		var count = result;
		res.render('SPA.ejs',{findTotalRevisions_count: count});
    })
}

module.exports.findRegUserRevisionsPerYear = function(req, res){
    
	Revision.findRegUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findRegUserRevisionsPerYear_year" + i: result[i]['_id'], "findRegUserRevisionsPerYear_count" + i: result[i]['regUserRevisionCount']});
		}
    })
}

module.exports.findAdminUserRevisionsPerYear = function(req, res){
    
	Revision.findAdminUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findAdminUserRevisionsPerYear_year" + i: result[i]['_id'], "findAdminUserRevisionsPerYear_count" + i: result[i]['adminRevisionCount']});
		}
    })
}

module.exports.findBotUserRevisionsPerYear = function(req, res){
    
	Revision.findBotUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findBotUserRevisionsPerYear_year" + i: result[i]['_id'], "findBotUserRevisionsPerYear_count" + i: result[i]['botRevisionCount']});
		}
    })
}

module.exports.findAnonUserRevisionsPerYear = function(req, res){
    
	Revision.findAnonUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findAnonUserRevisionsPerYear_year" + i: result[i]['_id'], "findAnonUserRevisionsPerYear_count" + i: result[i]['anonRevisionCount']});
		}
    })
}

module.exports.findTotalRevisionsPerYear = function(req, res){
    
	Revision.findTotalRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findTotalRevisionsPerYear_year" + i: result[i]['_id'], "findTotalRevisionsPerYear_count" + i: result[i]['revisionCount']});
		}
    })
}


// Individual Article Analytics Controller//


module.exports.findArticleLatestRevision = function(req, res){
    
	Revision.findArticleLatestRevision(function(err, result){
		var timestamp = result[0]['timestamp'];
		res.render('SPA.ejs',{findArticleLatestRevision_timestamp: timestamp});
    })
}

module.exports.findArticleRevisionCount = function(req, res){
    
	Revision.findArticleRevisionCount(function(err, result){
		var count = result[0]['revisionCount'];
		res.render('SPA.ejs',{findArticleRevisionCount_count: count});
    })
}

module.exports.findArticleHighestRegularUserRevisionCount = function(req, res){
    
	Revision.findArticleHighestRegularUserRevisionCount(function(err, result){
		var user1 = result[0]['_id'];
		var title1 = result[0]['title'];
		var count1 = result[0]['revisionCount];

		var user2 = result[1]['_id'];
		var title2 = result[1]['title'];
		var count2 = result[1]['revisionCount];

		var user3 = result[2]['_id'];
		var title3 = result[2]['title'];
		var count3 = result[2]['revisionCount];

		var user4 = result[3]['_id'];
		var title4 = result[3]['title'];
		var count4 = result[3]['revisionCount];

		var user5 = result[4]['_id'];
		var title5 = result[4]['title'];
		var count5 = result[4]['revisionCount];

		res.render('SPA.ejs',
			{
			findArticleHighestRegularUserRevisionCount_user1: user1, findArticleHighestRegularUserRevisionCount_title1: title1, findArticleHighestRegularUserRevisionCount_count1: count1,
			findArticleHighestRegularUserRevisionCount_user2: user2, findArticleHighestRegularUserRevisionCount_title2: title2, findArticleHighestRegularUserRevisionCount_count2: count2,
			findArticleHighestRegularUserRevisionCount_user3: user3, findArticleHighestRegularUserRevisionCount_title3: title3, findArticleHighestRegularUserRevisionCount_count3: count3,
			findArticleHighestRegularUserRevisionCount_user4: user4, findArticleHighestRegularUserRevisionCount_title4: title4, findArticleHighestRegularUserRevisionCount_count4: count4,
			findArticleHighestRegularUserRevisionCount_user5: user5, findArticleHighestRegularUserRevisionCount_title5: title5, findArticleHighestRegularUserRevisionCount_count5: count5
			});
    })
}

module.exports.findArticleTotalRegUserRevisions = function(req, res){
    
	Revision.findArticleTotalRegUserRevisions(function(err, result){
		var count = result[0]['regUserRevisionCount'];
		res.render('SPA.ejs',{findArticleTotalRegUserRevisions_count: count});
    })
}

module.exports.findArticleTotalAdminUserRevisions = function(req, res){
    
	Revision.findArticleTotalAdminUserRevisions(function(err, result){
		var count = result[0]['adminUserRevisionCount'];
		res.render('SPA.ejs',{findArticleTotalAdminUserRevisions_count: count});
    })
}

module.exports.findArticleTotalBotUserRevisions = function(req, res){
    
	Revision.findArticleTotalBotUserRevisions(function(err, result){
		var count = result[0]['botUserRevisionCount'];
		res.render('SPA.ejs',{findArticleTotalBotUserRevisions_count: count});
    })
}

module.exports.findArticleTotalAnonUserRevisions = function(req, res){
    
	Revision.findArticleTotalAnonUserRevisions(function(err, result){
		var count = result[0]['anonUserRevisionCount'];
		res.render('SPA.ejs',{findArticleTotalAnonUserRevisions_count: count});
    })
}

module.exports.findArticleTotalRevisions = function(req, res){
    
	Revision.findArticleTotalRevisions(function(err, result){
		var count = result[0]['totalRevisionCount'];
		res.render('SPA.ejs',{findArticleTotalRevisions_count: count});
    })
}

module.exports.findArticleRegUserRevisionsPerYear = function(req, res){
    
	Revision.findArticleRegUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findArticleRegUserRevisionsPerYear_year" + i: result[i]['_id'], "findArticleRegUserRevisionsPerYear_count" + i: result[i]['regUserRevisionCount']});
		}
    })
}

module.exports.findArticleAdminUserRevisionsPerYear = function(req, res){
    
	Revision.findArticleAdminUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findArticleAdminUserRevisionsPerYear_year" + i: result[i]['_id'], "findArticleAdminUserRevisionsPerYear_count" + i: result[i]['adminRevisionCount']});
		}
    })
}

module.exports.findArticleBotUserRevisionsPerYear = function(req, res){
    
	Revision.findArticleBotUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findArticleBotUserRevisionsPerYear_year" + i: result[i]['_id'], "findArticleBotUserRevisionsPerYear_count" + i: result[i]['botRevisionCount']});
		}
    })
}

module.exports.findArticleAnonUserRevisionsPerYear = function(req, res){
    
	Revision.findArticleAnonUserRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findArticleAnonUserRevisionsPerYear_year" + i: result[i]['_id'], "findArticleAnonUserRevisionsPerYear_count" + i: result[i]['anonRevisionCount']});
		}
    })
}

module.exports.findArticleTotalRevisionsPerYear = function(req, res){
    
	Revision.findArticleTotalRevisionsPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findArticleTotalRevisionsPerYear_year" + i: result[i]['_id'], "findArticleTotalRevisionsPerYear_count" + i: result[i]['revisionCount']});
		}
    })
}

module.exports.findArticleUserRevisionCountPerYear = function(req, res){
    
	Revision.findArticleUserRevisionCountPerYear(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs', {"findArticleUserRevisionCountPerYear_year" + i: result[i]['_id'], "findArticleUserRevisionCountPerYear_count" + i: result[i]['revisionCount']});
		}
    })
}


// Author Analytics Controller //


module.exports.findAuthorArticleRevisionCount = function(req, res){
    
	Revision.findAuthorArticleRevisionCount(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs',
			{
			"findAuthorArticleRevisionCount_title" + i: result[i]['_id'],
			"findAuthorArticleRevisionCount_user" + i: result[i]['user'],
			"findAuthorArticleRevisionCount_count" + i: result[i]['revisionCount']
			});
		}
    })
}

module.exports.findAuthorArticleRevisionTimestamp = function(req, res){
    
	Revision.findAuthorArticleRevisionTimestamp(function(err, result){
		res.json(result);
		for (var i = 0; i < result.length; i++) {
			res.render('SPA.ejs',
			{
			"findAuthorArticleRevisionTimestamp_timestamp" + i: result[i]['timestamp'],
			});
		}
    })
}

module.exports.getStatus=function(req,res){
	res.redirect(req.get('referer'));
}