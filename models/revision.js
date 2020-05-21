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
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
        {$sort:{number:-1}},
        {$limit:2}
		]).exec(callback)
}

RevisionSchema.statics.findSmallestGroup2 = function(callback){
	
	return this.aggregate([
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
		{$sort:{number:1}},
		{$limit:2}
	]).exec(callback)
}

RevisionSchema.statics.findLargestGroup = function(inputNumber,callback){
	
	return this.aggregate([
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
        {$sort:{number:-1}},
        {$limit:parseInt(inputNumber)}
		]).exec(callback)
}

RevisionSchema.statics.findSmallestGroup = function(inputNumber,callback){
	
	return this.aggregate([
		{$group:{_id:{title:"$title",user:"$user"}, num: {$sum:1}}},
		{$group:{_id:"$_id.title", number: {$sum:1}}},
		{$sort:{number:1}},
		{$limit:parseInt(inputNumber)}
	]).exec(callback)
}

RevisionSchema.statics.findLongestHis = function(inputNumber,callback){
	
	return this.aggregate([
		{$sort:{timestamp:-1}},
		{$limit:parseInt(inputNumber)}
	]).exec(callback)
}

RevisionSchema.statics.findShortestHis = function(inputNumber,callback){
	
	return this.aggregate([
		{$sort:{timestamp:1}},
		{$limit:parseInt(inputNumber)}
	]).exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')
module.exports = Revision;
