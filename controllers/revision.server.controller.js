var Revision = require("../models/revision")
var highestRev1 = "";
var highestRev2 = "";
var lowestRev1="";
var lowestRev2 = "";
var number1;
var number2;
var number3;
var number4;

var request = require('request');
function requestFromWiki(title,time, callback) {
	var num = 0;
	var wikiEndpoint = "https://en.wikipedia.org/w/api.php";
	var result = {
			num: 0,
			timestamp: "",
			name: title
	};
	
	var parameters = [
	    "titles=",
	    "rvstart=",
	    "rvdir=newer",
	    "action=query",
	    "prop=revisions",
	    "rvlimit=500",
	    "rvprop=ids|flags|user|userid|timestamp|size|sha1|parsedcomment",
	    "formatversion=2",
	    "format=json"
	]
	//console.log("Title is: "+title+" timestamp is:"+time);
	parameters[0]+=title;
	parameters[1]+=time;
	url = wikiEndpoint + "?" + parameters.join("&");
	var options = {
	    url: url,
	    method: 'GET',
	    headers: {
	        'Accept': 'application/json',
	        'Accept-Charset': 'utf-8'
		}
	};
	
	request(options, function (err, res, data){
	    if (err) {
	        console.log('Error:', err);
	    } else if (res.statusCode !== 200) {
	        console.log('Error status code:', res.statusCode);
	    } else {
	        console.log('Status:', res.statusCode);
	        var json = JSON.parse(data);
	        console.log(json);
	        var pages = json.query.pages;
	        var revisions = pages[Object.keys(pages)[0]].revisions;	
	        num = revisions.length;
	        console.log("There are " + revisions.length + " revisions.");
	        //console.log(revisions);
	        result.num = revisions.length;
	        result.timestamp = revisions[0].timestamp;
	        return callback(result);
	    }
	});
}


module.exports.getHighestRevision2=function(req,res){
    
	Revision.findHighestRevision2(function(err,result){
		 res.json(result);
    })

 
}
module.exports.getLowestRevision2=function(req,res){
	Revision.findLowestRevision2(function(err,result){
		 res.json(result);
    })
}


module.exports.getHighestRevid=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findHighestRevid(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLowestRevid=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findLowestRevid(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLargestGroup2=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findLargestGroup2(function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}


module.exports.getSmallestGroup2=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findSmallestGroup2(function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLargestGroup=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findLargestGroup(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getSmallestGroup=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findSmallestGroup(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLongestHis=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findLongestHis(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getShortestHis=function(req,res){
    inputNumber = req.query.inputNumber;
	//console.log("number is :", inputNumber);
    Revision.findShortestHis(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLongestHis2=function(req,res){
    Revision.findLongestHis2(function(err,result){
            res.json(result);
    })
}

module.exports.getShortestHis2=function(req,res){
    Revision.findShortestHis2(function(err,result){
            res.json(result);
    })
}



module.exports.getAdmin=function(req,res){
    Revision.findAdmins(function(err,result){
        res.json(result);
    })
}
module.exports.getBot=function(req,res){
    Revision.findBots(function(err,result){
        res.json(result);
    })
}

module.exports.getReg=function(req,res){
    Revision.findRegs(function(err,result){
        res.json(result);
    })
}

module.exports.getAnon=function(req,res){
    Revision.findAnons(function(err,result){
        res.json(result);
    })
}

module.exports.getTotalAdmin=function(req,res){
    Revision.findTotalAdmins(function(err,result){
        res.json(result);
    })
}
module.exports.getTotalBot=function(req,res){
    Revision.findTotalBots(function(err,result){
        res.json(result);
    })
}

module.exports.getTotalReg=function(req,res){
    Revision.findTotalRegs(function(err,result){
        res.json(result);
    })
}

module.exports.getTotalAnon=function(req,res){
    Revision.findTotalAnons(function(err,result){
        res.json(result);
    })
}

module.exports.getRevisionNames=function(req,res){
    Revision.findRevisionNames(function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualTitle=function(req,res){
    revisionName = req.query.revisionName;
	Revision.findIndividualTitleLatestUpdate(revisionName,function(err,result){
        requestFromWiki(revisionName, result[0].timestamp.toISOString(), function(result1) {
        	//console.log("Number of revision downloaded is "+result1);
        	res.json(result1);
        });
    }) 
}

module.exports.getIndividualRevisionNumber=function(req,res){
    revisionName = req.query.revisionName;
    console.log("revision name is: "+revisionName);
	Revision.findIndividualRevisionNumber(revisionName,function(err,result){
		res.json(result);
    }) 
}

module.exports.getIndividualRevisionTop=function(req,res){
    revisionName = req.query.revisionName;
    console.log("revision name is: "+revisionName);
	Revision.findIndividualRevisionTop(revisionName,function(err,result){
		res.json(result);
    }) 
}

module.exports.getIndividualAdmin=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualAdmins(revisionName,function(err,result){
        res.json(result);
    })
}
module.exports.getIndividualBot=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualBots(revisionName,function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualReg=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualRegs(revisionName,function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualAnon=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualAnons(revisionName,function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualTotalAdmin=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualTotalAdmins(revisionName,function(err,result){
        res.json(result);
    })
}
module.exports.getIndividualTotalBot=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualTotalBots(revisionName,function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualTotalReg=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualTotalRegs(revisionName,function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualTotalAnon=function(req,res){
	revisionName = req.query.revisionName;
    Revision.findIndividualTotalAnons(revisionName,function(err,result){
        res.json(result);
    })
}

module.exports.getIndividualByUser=function(req,res){
	revisionName = req.query.revisionName;
	userName = req.query.userName;
    Revision.findIndividualByUser(revisionName,userName,function(err,result){
        res.json(result);
    })
}

module.exports.getTotalUser=function(req,res){
    Revision.findTotalUser(function(err,result){
        res.json(result);
    })
}

module.exports.getUserRevisions=function(req,res){
	console.log(res.query);
	userName = req.query.userName;
    Revision.findUserRevisions(userName, function(err,result){
        res.json(result);
    })
}

module.exports.getUserRevisionsTime=function(req,res){	
	userName = req.query.userName;
	revisionName = req.query.revisionName;
    Revision.findUserRevisionsTime(userName,revisionName, function(err,result){
        res.json(result);
    })
}