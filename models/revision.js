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

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')
module.exports = Revision;
