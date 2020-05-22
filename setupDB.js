var fs = require("fs")
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Assignment2',function () {
    console.log('mongodb connected')
});

var revSchema = new mongoose.Schema(
		{
			revid: Number, 
			parentid: Number,
			user:String,
			anon:String,
			timestamp:String, 
			size:Number,
			sha1:String,
			parsedcomment:String,
			title:String,
			type:String},
			 {
			 	versionKey: false
			})

var revision=require("./models/revision")
var bot = fs.readFileSync('bots.txt').toString();
var bots = bot.split("\n");
var admin = fs.readFileSync('administrators.txt').toString();
var admins = admin.split("\n");

//console.log(bots);


function isBot(doc) {
    for(var i = 0; i< bots.length;i++){
    	
        if(doc.user == bots[i]){
            return true;
    	}
    }
    return false;
}	

function isAdmin(doc) {
    for(var i = 0; i< admins.length;i++){
        if(doc.user == admins[i])
            return true;
    }
    return false;
}

function isAnon(doc) {
    if(doc.anon==(""))
        return true;
    else
        return false;
}



revision.find({}).skip(0).limit(56947*2).exec(function (err,result) {
    if(err){
        console.log(err);
    }
    console.log('getin');
    
    
    result.forEach(function(doc){
    	//console.log(doc);
        if(isAdmin(doc)){
        	doc.set({type: 'admin' });
        }else if(isBot(doc)){
        	doc.set({type: 'bot' });
        }else if (isAnon(doc)) {
        	doc.set({type: 'anon' });
        }
        else{
        	doc.set({type: 'reg' });   
        }
        doc.save(function (err) {
            if(err){
                console.log(err);
                return;
            }
        });

    })
    console.log("finish!!!");
});

