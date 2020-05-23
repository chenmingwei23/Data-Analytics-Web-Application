var mongoose = require('./db')

// the base article revision schema
var RevisionSchema = new mongoose.Schema(
		{
		revid: Number, 
		parentid: Number,
        minor: String,
		user: String,
        userType: String,
		anon: String,
        userid: Number,
		timestamp: String, 
		size: Number,
		sha1: String,
		parsedcomment: String,
		title: String
        },
)  


// Overall Analytics //


// The top two articles with the highest number of revisions and their number of revisions.
RevisionSchema.statics.findHighestRevisionCount = function(callback) {

    return this.aggregate([
    	{$match:{title:{$exists:true}}},
        {$group:{_id:"$title", revisionCount:{$sum: 1}}},
        {$sort:{revisionCount:-1}},
        {$limit: 2}
        ])
    .exec(callback)
}

// The top two articles with the lowest number of revisions and their number of revisions.
RevisionSchema.statics.findLowestRevisionCount = function(callback) {

    return this.aggregate([
    	{$match:{title:{$exists:true}}},
        {$group:{_id:"$title", revisionCount:{$sum: 1}}},
        {$sort:{revisionCount: 1}},
        {$limit: 2}
        ])
    .exec(callback)
}

// The top two articles edited by the largest group of registered users (non bots) and their group size.
RevisionSchema.statics.findLargestUniqueUserRevisionCount = function(callback) {
	
	return this.aggregate([
    	{$match:{$not:{userType:"bot"}}},
		{$group:{_id:{title:"$title", user:"$user"}},          
		{$group:{_id:"$_id.title", uniqueUserCount:{$sum: 1}}},
        {$sort:{uniqueUserCount: -1}},
        {$limit: 2}
	    ])
    .exec(callback)
}

// The top two articles edited by the smallest group of registered users (non bots) and their group size.
RevisionSchema.statics.findSmallestUniqueUserRevisionCount = function(callback) {

	return this.aggregate([
        {$match:{$not:{userType:"bot"}}},
		{$group:{_id:{title:"$title", user:"$user"}},          
		{$group:{_id:"$_id.title", uniqueUserCount:{$sum: 1}}},
        {$sort:{uniqueUserCount: 1}},
        {$limit: 2}
	    ])
    .exec(callback)
}

// The top two articles with the longest history (measured by age) and and their age (in days).
RevisionSchema.statics.findLongestHistoryAgeCount = function(callback) {

	return this.aggregate([
		{$sort:{timestamp: 1}},
        {$project:{
            _id: 0,
            title: 1,
            age:{$subtract:["$currentDate", "$timestamp"]}
        }},
		{$limit:2}
	    ])
    .exec(callback)
}

// The top two articles with the shortest history (measured by age) and their age (in days).
RevisionSchema.statics.findShortestHistoryAgeCount = function(callback) {

	return this.aggregate([
		{$sort:{timestamp: -1}},
        {$project:{
            _id: 0,
            title: 1,
            age:{$subtract:["$currentDate", "$timestamp"]}
        }},
		{$limit: 2}
	    ])
    .exec(callback)
}
        
// distinct regular-user count
RevisionSchema.statics.findTotalDistinctRegularUsers = function(callback) {

	return RevisionSchema.distinct("user", {"userType":"reg"}).length;
}

// distinct admin-user count
RevisionSchema.statics.findTotalDistinctAdminUsers = function(callback) {

	return RevisionSchema.distinct("user", {"userType":"admin"}).length;
}

// distinct bot-user count
RevisionSchema.statics.findTotalDistinctBotUsers = function(callback) {

	return RevisionSchema.distinct("user", {"userType":"bot"}).length;
}

// distinct anon-user count
RevisionSchema.statics.findTotalDistinctAnonUsers = function(callback) {

	return RevisionSchema.distinct("user", {"anon":"true"}).length;
}

// distinct total user count
RevisionSchema.statics.findTotalDistinctUsers = function(callback) {

	return RevisionSchema.distinct("user").length;
}

// number of total revisions made by non-distinct regular users
RevisionSchema.statics.findTotalRegularUserRevisions = function(callback) {

	return RevisionSchema.find({"userType":"reg"}).count();
}

// number of total revisions made by non-distinct admin users
RevisionSchema.statics.findTotalAdminUserRevisions = function(callback) {

	return RevisionSchema.find({"userType":"admin"}).count();
}

// number of total revisions made by non-distinct bot users
RevisionSchema.statics.findTotalBotUserRevisions = function(callback) {

	return RevisionSchema.find({"userType":"bot"}).count();
}

// number of total revisions made by non-distinct anon users
RevisionSchema.statics.findTotalAnonUserRevisions = function(callback) {

	return RevisionSchema.find({"anon":"true"}).count();
}

// number of total revisions made
RevisionSchema.statics.findTotalRevisions = function(callback) {

	return RevisionSchema.count();
}

// number of total revisions made by non-distinct regular users per year
RevisionSchema.statics.findRegUserRevisionsPerYear = function(callback) {

	return this.aggregate([
		{$match:{userType:"reg", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, regUserRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct admin users per year
RevisionSchema.statics.findAdminUserRevisionsPerYear = function(callback) {

	return this.aggregate([
		{$match:{userType:"admin", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, adminRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct bot users per year
RevisionSchema.statics.findBotUserRevisionsPerYear = function(callback) {

	return this.aggregate([
    	{$match:{userType:"bot", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, botRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct anon users per year
RevisionSchema.statics.findAnonUserRevisionsPerYear = function(callback) {

	return this.aggregate([
		{$match:{anon:"true", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, anonRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made per year
RevisionSchema.statics.findTotalRevisionsPerYear = function(callback) {

	return this.aggregate([
		{$match:{timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, revisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}


// Individual Article Analytics //


// latest revision date of a selected article
RevisionSchema.statics.findArticleLatestRevision = function (selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, timestamp:{$exists:true}}},
		{$project:{_id: 0, timestamp: 1}},
		{$sort:{timestamp: -1}},
        {$limit: 1}
		])
    .exec(callback)
}

// number of revisions made to a selected article
RevisionSchema.statics.findArticleRevisionCount= function(selectedArticle, callback){

    return this.aggregate([
    	{$match:{title:selectedArticle}},
    	{$group:{_id:"$title", revisionCount:{$sum: 1}}},
		{$project:{_id: 0, revisionCount: 1}}
        ])
    .exec(callback)
}

// The top 5 regular users ranked by total revision numbers on a selected article, and the respective revision numbers
RevisionSchema.statics.findArticleHighestRegularUserRevisionCount = function(selectedArticle, callback){

    return this.aggregate([
        {$match:{title:selectedArticle, userType:"reg"}},
    	{$group:{_id:{user:"$user"}, revisionCount:{$sum: 1}}},
		{$project:{_id: 1, title: 1, revisionCount: 1}}
		{$sort:{revisionCount: -1}},
    	{$limit: 5}
        ])
    .exec(callback)
}

// number of total revisions made by non-distinct regular users on a selected article
RevisionSchema.statics.findArticleTotalRegUserRevisions = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, userType:"reg", timestamp:{$exists:true}}},
		{$group:{_id:"$title", regUserRevisionCount:{$sum: 1}}},
        {$project:{_id: 0, regUserRevisionCount: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct admin users on a selected article
RevisionSchema.statics.findArticleTotalAdminUserRevisions = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, userType:"admin", timestamp:{$exists:true}}},
		{$group:{_id:"$title", adminUserRevisionCount:{$sum: 1}}},
        {$project:{_id: 0, adminUserRevisionCount: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct bot users on a selected article
RevisionSchema.statics.findArticleTotalBotUserRevisions = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, userType:"bot", timestamp:{$exists:true}}},
		{$group:{_id:"$title", botUserRevisionCount:{$sum: 1}}},
        {$project:{_id: 0, botUserRevisionCount: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct anon users on a selected article
RevisionSchema.statics.findArticleTotalAnonUserRevisions = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, anon:"true", timestamp:{$exists:true}}},
		{$group:{_id:"$title", anonUserRevisionCount:{$sum: 1}}},
        {$project:{_id: 0, anonUserRevisionCount: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made on a selected article
RevisionSchema.statics.findArticleTotalRevisions = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, timestamp:{$exists:true}}},
		{$group:{_id:"$title", totalRevisionCount:{$sum: 1}}},
        {$project:{_id: 0, totalRevisionCount: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct regular users per year on a selected article
RevisionSchema.statics.findArticleRegUserRevisionsPerYear = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, userType:"reg", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, regUserRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct admin users per year on a selected article
RevisionSchema.statics.findArticleAdminUserRevisionsPerYear = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, userType:"admin", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, adminRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct bot users per year on a selected article
RevisionSchema.statics.findArticleBotUserRevisionsPerYear = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, userType:"bot", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, botRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made by non-distinct anon users per year on a selected article
RevisionSchema.statics.findArticleAnonUserRevisionsPerYear = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, anon:"true", timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, anonRevisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made per year on a selected article
RevisionSchema.statics.findArticleTotalRevisionsPerYear = function(selectedArticle, callback) {

	return this.aggregate([
        {$match:{title:selectedArticle, timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, revisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}

// number of total revisions made per year on a selected article by its top five contributors 
// the parameter 'articleUserRevisionDocument' takes in an argument that must contain:
// the name of the contributing user,
// the title of the selected article,  
// The output from the function 'findArticleHighestRegularUserRevisionCount.toArray()' can be used in conjunction to help build the document required for this function,
// in which each document is already in the form {"_id": "OneOfTheTopFiveUsers", "title": "title", "revisionCount": x }
// Call this function five times, each time providing a document that represents a different top five contributor to the selected article, to fulfill the requirement.
RevisionSchema.statics.findArticleUserRevisionCountPerYear = function (articleUserRevisionDocument, callback) {

    var selectedArticle = articleUserRevisionDocument.title;
	var articleser = articleUserRevisionDocument.user;

	return this.aggregate([
        {$match:{title:selectedArticle, user:articleUser, timestamp:{$exists:true}}},
		{$group:{_id:{$substr:["$timestamp", 0, 4]}, revisionCount:{$sum: 1}}},
		{$sort:{_id: 1}}
	    ])
    .exec(callback)
}


// Author Analytics //


// find all articles that are changed (or have revisions made) by a selected author and 
// display the articles’ names along with number of revisions made by that author next to it
RevisionSchema.statics.findAuthorArticleRevisionCount = function(selectedAuthor, callback) {

	return this.aggregate([
		{$match:{user:selectedAuthor}},
		{$group:{_id:"$title", revisionCount:{$sum: 1}}},
		{$project:{_id: 1, user: 1, revisionCount: 1}}
		])
	.exec(callback)
}

// display the timestamps of all revisions made to a specific article by a selected author
// the parameter 'authorArticleDocument' takes in an argument that must contain:
// the title of the specific article,  
// the name of the selected author,
// The output from the function 'findArticleAuthorRevisionCoun.toArray()' can be used in conjunction to help build the document required for this function,
// in which each document is already in the form { "_id": "selectedArticle", "user": "selectedAuthor", "revisionCount": x }
RevisionSchema.statics.findAuthorArticleRevisionTimestamp = function(authorArticleDocument, callback) {

    var selectedArticle = authorArticleDocument.title;
	var selectedAuthor = authorArticleDocument.user;

	return this.aggregate([
		{$match:{title:selectedArticle, user:selectedAuthor}},
		{$project:{_id: 0, timestamp: 1}},
		{$sort:{timestamp: 1}}
		])
	.exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')
module.exports = Revision