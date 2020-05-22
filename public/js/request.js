var request = require('request');

var wikiEndpoint = "https://en.wikipedia.org/w/api.php";
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

parameters[0]+="CNN";
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
        var pages = json.query.pages;
        console.log("pages:\n" + JSON.stringify(pages));
        var revisions = pages[Object.keys(pages)[0]].revisions;
        console.log("There are " + revisions.length + " revisions.");
        var users=[];
        for (revid in revisions){
            users.push(revisions[revid].user);
        }
        uniqueUsers = new Set(users);
        console.log("The revisions are made by " + uniqueUsers.size + " unique users");
    }
});
