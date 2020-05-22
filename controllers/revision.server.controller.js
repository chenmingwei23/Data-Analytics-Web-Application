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
	console.log("number is :", inputNumber);
    Revision.findHighestRevid(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLowestRevid=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findLowestRevid(inputNumber,function(err,result){
    		//console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLargestGroup2=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findLargestGroup2(function(err,result){
    		console.log("result is :", result);
            res.json(result);
    })
}


module.exports.getSmallestGroup2=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findSmallestGroup2(function(err,result){
    		console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLargestGroup=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findLargestGroup(inputNumber,function(err,result){
    		console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getSmallestGroup=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findSmallestGroup(inputNumber,function(err,result){
    		console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getLongestHis=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findLongestHis(inputNumber,function(err,result){
    		console.log("result is :", result);
            res.json(result);
    })
}

module.exports.getShortestHis=function(req,res){
    inputNumber = req.query.inputNumber;
	console.log("number is :", inputNumber);
    Revision.findShortestHis(inputNumber,function(err,result){
    		console.log("result is :", result);
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

module.exports.getIndividualTitle=function(req,res){
    inputTitle = req.query.inputTitle;
    Revision.findIndividualTitle(inputTitle, function(err,revision){
        if (err){
            console.log("Cannot find " + inputTitle + ",s latest revision!")
        }
        else{
            res.json(revision);
        }
    })
}