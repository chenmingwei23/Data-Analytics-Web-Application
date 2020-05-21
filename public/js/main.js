var barchart = ([
    ['Year', 'Anonymous','Administrator', 'Bot','Regular user'],
    ['2001',1,1,1,1], ['2002',1,1,1,1], ['2003',1,1,1,1], ['2004',1,1,1,1], ['2005',1,1,1,1], 
    ['2006',1,1,1,1], ['2007',1,1,1,1], ['2008',1,1,1,1], ['2009',1,1,1,1], ['2010',1,1,1,1],
    ['2011',1,1,1,1], ['2012',1,1,1,1], ['2013',1,1,1,1], ['2014',1,1,1,1], ['2015',1,1,1,1], 
    ['2016',1,1,1,1], ['2017',1,1,1,1], ['2018',1,1,1,1], ['2019',1,1,1,1], ['2020',1,1,1,1]
])

function drawbarChart(){


    var graphData = google.visualization.arrayToDataTable(barchart);
    var chart = new google.visualization.ColumnChart($("#columnOverall")[0]);
    chart.draw(graphData, columnoptions);
}



$(document).ready(function(){
	$.get('/spa/getHighestRevid2', null, function (data) {
        for (var i = 0; i < 2; i++) {
            $("#getHighestRevid").append("Title: " + data[i]._id + ", ")
            $("#getHighestRevid").append("Number Of Revisions: " + data[i].numOfRevid + "<br>")

        }
    });
    $.get('/spa/getLowestRevid2', null, function (data) {
        for (var i = 0; i < 2; i++) {
            $("#getLowestRevid").append("Title: " + data[i]._id + ", ")
            $("#getLowestRevid").append("Number Of Revisions: " + data[i].numOfRevid + "<br>")

        }
    });
    $.get('/spa/getLargestGroup2', null, function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#getLargestGroup").append("Title: " + data[i]._id + ", ")
            $("#getLargestGroup").append("Number Of registered users: " + data[i].number + "<br>")

        }
    });
    $.get('/spa/getSmallestGroup2', null, function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#getSmallestGroup").append("Title: " + data[i]._id + ", ")
            $("#getSmallestGroup").append("Number Of registered users: " + data[i].number + "<br>")

        }
    });
    
    $.get('/spa/getBar', null, function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#getShortestHis").append("Title: " + data[i].title + ", ")
            $("#getShortestHis").append("Age: " + data[i].timestamp + "<br>")

        }
    });
    
   
    
	$("#getNumber").click(function (e) {
        $("#getHighestRevid3").empty()
        $("#getLowestRevid3").empty()
        $("#getHighestRevid").empty()
        $("#getLowestRevid").empty()
        $("#getLargestGroup").empty()
        $("#getSmallestGroup").empty()
        $("#getLargestGroup2").empty()
        $("#getSmallestGroup2").empty()
        $("#getLongestHis").empty()
        $("#getShortestHis").empty()

        var parameters = {inputNumber: $('#inputNumber').val()};
        
        if ($('#inputNumber').val()<0){ alert("This number must be positive!")}
        $.get('/spa/getHighestRevid', parameters, function (data) {

            for (var i = 0; i < data.length; i++) {
                $("#getHighestRevid").append("Title: " + data[i]._id + ", ")
                $("#getHighestRevid").append("Number Of Revisions: " + data[i].numOfRevid + "<br>")

            }
        });
        $.get('/spa/getLowestRevid', parameters, function (data) {

            for (var i = 0; i < data.length; i++) {
                $("#getLowestRevid").append("Title: " + data[i]._id + ", ")
                $("#getLowestRevid").append("Number Of Revisions: " + data[i].numOfRevid + "<br>")

            }
        });
        $.get('/spa/getLargestGroup', parameters, function (data) {

            for (var i = 0; i < data.length; i++) {
                $("#getLargestGroup").append("Title: " + data[i]._id + ", ")
                $("#getLargestGroup").append("Number Of registered users: " + data[i].number + "<br>")

            }
        });
        $.get('/spa/getSmallestGroup', parameters, function (data) {

            for (var i = 0; i < data.length; i++) {
                $("#getSmallestGroup").append("Title: " + data[i]._id + ", ")
                $("#getSmallestGroup").append("Number Of registered users: " + data[i].number + "<br>")

            }
        });
        $.get('/spa/getLongestHis', parameters, function (data) {

            for (var i = 0; i < data.length; i++) {
                $("#getLongestHis").append("Title: " + data[i]._id.title + ", ")
                $("#getLongestHis").append("Age: " + data[i].dateDifference + " days<br>")
            }
        });
        $.get('/spa/getShortestHis', parameters, function (data) {

            for (var i = 0; i < data.length; i++) {
                $("#getShortestHis").append("Title: " + data[i]._id.title + ", ")
                $("#getShortestHis").append("Age: " + data[i].dateDifference + " days<br>")

            }
        });
        
    });
	
	
	
	
	
  
});
