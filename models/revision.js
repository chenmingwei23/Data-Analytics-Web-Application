var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{
		revid: Number, 
		parentid: Number,
		user:String,
		anon:String,
		timestamp:String, 
		size:Number,
		sha1:String,
		type:String,
		parsedcomment:String,
		title:String},
		 {
		 	versionKey: false
		})

RevisionSchema.statics.setup = function(callback){
	return this.find().forEach(function(doc){
		doc.timestamp = new ISODate(doc.timestamp);
		db.revisions.save(doc)
		}).exec(callback)
}

RevisionSchema.statics.findHighestRevision2 = function(callback){

    return this.aggregate([
    	{$match:{title:{$exists:true}}},
        {$group:{_id:"$title",numOfRevid:{$sum:1}}},
        {$sort:{numOfRevid:-1}},
        {$limit:2}
    ])
        .exec(callback)
}

RevisionSchema.statics.findLowestRevision2 = function(callback){

    return this.aggregate([
    	{$match:{title:{$exists:true}}},
        {$group:{_id:"$title",numOfRevid:{$sum:1}}},
        {$sort:{numOfRevid:1}},
        {$limit:2}
    ])
        .exec(callback)
}

RevisionSchema.statics.findHighestRevid = function(inputNumber,callback){
	
	return this.aggregate([
        {$match:{title:{$exists:true}}},
        {$group:{_id:"$title",numOfRevid:{$sum:1}}},
        {$sort:{numOfRevid:-1}},
        {$limit:parseInt(inputNumber)}
	])
	.exec(callback)
}

RevisionSchema.statics.findLowestRevid = function(inputNumber,callback){

    return this.aggregate([
        {$match:{title:{$exists:true}}},
        {$group:{_id:"$title",numOfRevid:{$sum:1}}},
        {$sort:{numOfRevid:1}},
        {$limit:parseInt(inputNumber)}
    ])
        .exec(callback)
}

RevisionSchema.statics.findLargestGroup2 = function(callback){
	
	return this.aggregate([
		{$match:{$or: [{type:"admin"},{type:"reg"}]}},
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
        {$sort:{number:-1}},
        {$limit:2}
		]).exec(callback)
}

RevisionSchema.statics.findSmallestGroup2 = function(callback){
	
	return this.aggregate([
		{$match:{$or: [{type:"admin"},{type:"reg"}]}},
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
		{$sort:{number:1}},
		{$limit:2}
	]).exec(callback)
}

RevisionSchema.statics.findLargestGroup = function(inputNumber,callback){
	
	return this.aggregate([
		{$match:{$or: [{type:"admin"},{type:"reg"}]}},
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
        {$sort:{number:-1}},
        {$limit:parseInt(inputNumber)}
		]).exec(callback)
}

RevisionSchema.statics.findSmallestGroup = function(inputNumber,callback){
	
	return this.aggregate([
		{$match:{$or: [{type:"admin"},{type:"reg"}]}},
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
        {$sort:{number:1}},
        {$limit:parseInt(inputNumber)}
		]).exec(callback)
}

RevisionSchema.statics.findLongestHis = function(inputNumber,callback){
	
	return this.aggregate([

        {$group : {
            _id:{title:"$title"},
            maxValue : {$max : "$timestamp"}, 
            minValue : {$min : "$timestamp"},
 
        }},
        {$project:{dateDifference:{$round:[{$divide:[{ $subtract: [ "$maxValue", "$minValue" ]},86400000]},0]}}},
        {$sort:{dateDifference:-1}},
        {$limit:parseInt(inputNumber)}
        ]).exec(callback)
}

RevisionSchema.statics.findShortestHis = function(inputNumber,callback){
	
	return this.aggregate([

        {$group : {
            _id:{title:"$title"},
            maxValue : {$max : "$timestamp"}, 
            minValue : {$min : "$timestamp"},
 
        }},
        {$project:{dateDifference:{$round:[{$divide:[{ $subtract: [ "$maxValue", "$minValue" ]},86400000]},0]}}},
        {$sort:{dateDifference:1}},
        {$limit:parseInt(inputNumber)}
        ]).exec(callback)
}

RevisionSchema.statics.findLongestHis2 = function(callback){
	
	return this.aggregate([

        {$group : {
            _id:{title:"$title"},
            maxValue : {$max : "$timestamp"}, 
            minValue : {$min : "$timestamp"},
 
        }},
        {$project:{dateDifference:{$round:[{$divide:[{ $subtract: [ "$maxValue", "$minValue" ]},86400000]},0]}}},
        {$sort:{dateDifference:-1}},
        {$limit:2}
        ]).exec(callback)
}

RevisionSchema.statics.findShortestHis2 = function(callback){
	
	return this.aggregate([

        {$group : {
            _id:{title:"$title"},
            maxValue : {$max : "$timestamp"}, 
            minValue : {$min : "$timestamp"},
 
        }},
        {$project:{dateDifference:{$round:[{$divide:[{ $subtract: [ "$maxValue", "$minValue" ]},86400000]},0]}}},
        {$sort:{dateDifference:1}},
        {$limit:2}
        ]).exec(callback)
}

RevisionSchema.statics.findAdmins = function(callback){
	return this.aggregate([
		{$match:{type:"admin"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findBots = function(callback){
	return this.aggregate([
		{$match:{type:"bot"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findRegs = function(callback){
	return this.aggregate([
		{$match:{type:"reg"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findAnons = function(callback){
	return this.aggregate([
		{$match:{type:"anon"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findTotalAnons = function(callback){
	return this.aggregate([
		{$match:{anon:""}},
		{ $group: { _id: "anon user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findTotalAdmins = function(callback){
	return this.aggregate([
		{$match:{type:"admin"}},
		{ $group: { _id: "admin user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findTotalBots = function(callback){
	return this.aggregate([
		{$match:{type:"bot"}},
		{ $group: { _id: "bot user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findTotalRegs = function(callback){
	return this.aggregate([
		{$match:{type:"reg"}},
		{ $group: { _id: "reg user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findRevisionNames = function(callback){
	return this.aggregate([   
        {$group : { _id:{title:"$title"},number:{$sum:1}}
        }]).exec(callback)
}

RevisionSchema.statics.findIndividualTitle = function(input, callback){
	console.log("???");
	return this.aggregate([   
		{$match: {title:"Canada"}}
        ]).exec(callback)
}

RevisionSchema.statics.findIndividualTitleLatestUpdate = function(input, callback){
	return this.aggregate([   
		{$match: {title:input}},
		{$sort:{timestamp:-1}},
		{$limit:1}
        ]).exec(callback)
}

RevisionSchema.statics.findIndividualRevisionNumber = function(input, callback){
	return this.aggregate([
    	{$match:{title:input}},
    	{$group:{_id:"$title",numofrevisions:{$sum:1}}}
    ]).exec(callback)
}

RevisionSchema.statics.findIndividualRevisionTop = function(input, callback){
	return this.aggregate([
    	{$match:{title:input}},
    	{$match:{type:"reg"}},
    	{$group:{_id:{user:"$user"}, num: {$sum:1}}},
		{$sort:{num:-1}},
    	{$limit:5}
    ]).exec(callback)
}

RevisionSchema.statics.findIndividualAdmins = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"admin"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findIndividualBots = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"bot"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findIndividualRegs = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"reg"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findIndividualAnons = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"anon"}},
		{$match:{timestamp:{$exists:true}}},
		{$group: {_id: { $substr: ["$timestamp", 0, 4 ] }, number: {$sum: 1}}},
		{$sort: {_id: 1}}
	]).exec(callback)
}

RevisionSchema.statics.findIndividualTotalAnons = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{anon:""}},
		{ $group: { _id: "anon user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findIndividualTotalAdmins = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"admin"}},
		{ $group: { _id: "admin user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findIndividualTotalBots = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"bot"}},
		{ $group: { _id: "bot user", count: { $sum: 1 } } }
	]).exec(callback)
}

RevisionSchema.statics.findIndividualTotalRegs = function(input,callback){
	return this.aggregate([
		{$match:{title:input}},
		{$match:{type:"reg"}},
		{ $group: { _id: "reg user", count: { $sum: 1 } } }
	]).exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')
module.exports = Revision;
