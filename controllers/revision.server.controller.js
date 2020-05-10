var Revision = require("../models/revision")
var highestRev1 = "";
var highestRev2 = "";
var lowestRev1="";
var lowestRev2 = "";
var number1;
var number2;
var number3;
var number4;

module.exports.getHighestRevision2=function(req,res){
    
	Revision.findHighestRevision2(function(err,result){
		console.log(result);
		highestRev1 = result[0]['_id'];
		number1 = result[0]['numOfRevid'];
		highestRev2 = result[1]['_id'];
		number2 = result[1]['numOfRevid'];
    })

    Revision.findLowestRevision2(function(err,result){
		console.log(result);
		lowestRev1 = result[0]['_id'];
		number3 = result[0]['numOfRevid'];
		lowestRev2 = result[1]['_id'];
		number4 = result[1]['numOfRevid'];
    })

	res.render('SPA.ejs',{name1: highestRev1, name2: highestRev2, number1: number1, number2: number2, name3: lowestRev1, name4: lowestRev2, number3: number3, number4: number4  });

}

module.exports.getStatus=function(req,res){
	res.redirect(req.get('referer'));
}

