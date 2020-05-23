var request = require('request');

var wikiEndpoint = "https://en.wikipedia.org/w/api.php";
var parameters = [
    "titles=",
    "rvstart=2020-03-20T17:05:21Z",
    "rvdir=newer",
    "action=query",
    "prop=revisions",
    "rvlimit=15",
    "rvprop=ids|parentid|flags|user|userid|timestamp|size|sha1|parsedcomment|title",
    "formatversion=2",
    "format=json"
]

parameters[0]+="Australia";
//parameters[1]+=new Date().toISOString();
var url = wikiEndpoint + "?" + parameters.join("&");

console.log("url: " + url)
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
        //console.log(json.query);
        var pages = json.query.pages;
        console.log("pages:\n" + JSON.stringify(pages));
        var revisions = pages[Object.keys(pages)[0]].revisions;
        console.log(revisions);
        console.log("There are " + revisions.length + " revisions.");
        var users=[];
        for (revid in revisions){
            users.push(revisions[revid].user);
        }
        uniqueUsers = new Set(users);
        console.log("The revisions are made by " + uniqueUsers.size + " unique users");
    }
});
