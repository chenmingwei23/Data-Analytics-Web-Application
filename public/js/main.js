google.charts.load('current', {packages: ['corechart']});


var barchart = ([
    ['Year', 'Anonymous','Administrator', 'Bot','Regular user'],
    ['2001',1,1,1,1], ['2002',1,1,1,1], ['2003',1,1,1,1], ['2004',1,1,1,1], ['2005',1,1,1,1], 
    ['2006',1,1,1,1], ['2007',1,1,1,1], ['2008',1,1,1,1], ['2009',1,1,1,1], ['2010',1,1,1,1],
    ['2011',1,1,1,1], ['2012',1,1,1,1], ['2013',1,1,1,1], ['2014',1,1,1,1], ['2015',1,1,1,1], 
    ['2016',1,1,1,1], ['2017',1,1,1,1], ['2018',1,1,1,1], ['2019',1,1,1,1], ['2020',1,1,1,1]
])

var barchartIndividual = ([
    ['Year', 'Anonymous','Administrator', 'Bot','Regular user'],
    ['2001',1,1,1,1], ['2002',1,1,1,1], ['2003',1,1,1,1], ['2004',1,1,1,1], ['2005',1,1,1,1], 
    ['2006',1,1,1,1], ['2007',1,1,1,1], ['2008',1,1,1,1], ['2009',1,1,1,1], ['2010',1,1,1,1],
    ['2011',1,1,1,1], ['2012',1,1,1,1], ['2013',1,1,1,1], ['2014',1,1,1,1], ['2015',1,1,1,1], 
    ['2016',1,1,1,1], ['2017',1,1,1,1], ['2018',1,1,1,1], ['2019',1,1,1,1], ['2020',1,1,1,1]
])

var piedata = ([
        ['User Type', 'The number of users'],
        ['Anonymous', 0],
        ['Administrator', 0],
        ['Bot', 0],
        ['Regular user', 0]
])

var piedataIndividual = ([
        ['User Type', 'The number of users'],
        ['Anonymous', 0],
        ['Administrator', 0],
        ['Bot', 0],
        ['Regular user', 0]
])

var barChartOtions = {'title':"Revision number distribution by year and by user type",
    'width':1400,
    'height':600
};

var pieChartOptions = {
	    'title': "Revision Numbers By Different User Type",
	    'width': 900,
	    'height': 800
};

function drawBarChart(){
    var graphData = google.visualization.arrayToDataTable(barchart);
    var chart = new google.visualization.ColumnChart($("#barChart")[0]);
    console.log(piedata);
    chart.draw(graphData, barChartOtions);
}

function drawIndividualBarChart(){
    var graphDataIndividual = google.visualization.arrayToDataTable(barchartIndividual);
    var chartIndividual = new google.visualization.ColumnChart($("#barChartIndividual")[0]);
    chartIndividual.draw(graphDataIndividual, barChartOtions);
}

function drawPie() {  
    var graphData = google.visualization.arrayToDataTable(piedata);
    var chart = new google.visualization.PieChart($("#pieChart")[0]);
    chart.draw(graphData, pieChartOptions);
}

function drawPieIndividual() {  
    var graphDataIndividual = google.visualization.arrayToDataTable(piedataIndividual);
    var chartIndividual = new google.visualization.PieChart($("#pieChartIndividual")[0]);
    chartIndividual.draw(graphDataIndividual, pieChartOptions);
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
    
    $.get('/spa/getLongestHis2', null, function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#getLongestHis").append("Title: " + data[i]._id.title + ", ")
            $("#getLongestHis").append("Age: " + data[i].dateDifference + " days<br>")
        }
    });
    
    $.get('/spa/getShortestHis2', null, function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#getShortestHis").append("Title: " + data[i]._id.title + ", ")
            $("#getShortestHis").append("Age: " + data[i].dateDifference + " days<br>")

        }
    });
    
    
    $.getJSON('/spa/getAnonsEachYear', null, function (data) {
        for (var i = 0;i<data.length;i++) {
        	var index = data[i]._id % 2000;
        	barchart[index][1] = parseInt(data[i].number);
        }
        
        $.getJSON('/spa/getAdminsEachYear', null, function (data) {
        	for (var i = 0;i<data.length;i++) {
            	var index = data[i]._id % 2000;
            	barchart[index][2] = parseInt(data[i].number);
            }
        	
        	$.getJSON('/spa/getBotsEachYear', null, function (data) {
            	for (var i = 0;i<data.length;i++) {
                	var index = data[i]._id % 2000;
                	barchart[index][3] = parseInt(data[i].number);
                }
            	
            	$.getJSON('/spa/getRegsEachYear', null, function (data) {
                	for (var i = 0;i<data.length;i++) {
                    	var index = data[i]._id % 2000;
                    	barchart[index][4] = parseInt(data[i].number);
                    }
            	    google.charts.setOnLoadCallback(drawBarChart);

                });
            });
        });

    });   

    $.getJSON('/spa/getTotalAnon', null, function (data) {
    	console.log(data);

        for (var i = 0; i < data.length; i++) {
            piedata[1][1] = parseInt(data[i].count);
        }


        $.getJSON('/spa/getTotalAdmin', null, function (data) {
        	console.log(data);

            for (var i = 0; i < data.length; i++) {
                piedata[2][1] = parseInt(data[i].count);
            }


            $.getJSON('/spa/getTotalBot', null, function (data) {
            	console.log(data);

                for (var i = 0; i < data.length; i++) {
                    piedata[3][1] = parseInt(data[i].count);
                }


                $.getJSON('/spa/getTotalReg', null, function (data) {
                	console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        piedata[4][1] = parseInt(data[i].count);
                    }
                    google.charts.setOnLoadCallback(drawPie);
                    var total = piedata[1][1] + piedata[2][1] + piedata[3][1] + piedata[4][1];
                    var a = (piedata[1][1]/total)*100;
                    var b = (piedata[2][1]/total)*100;
                    var c = (piedata[3][1]/total)*100;
                    var d = (piedata[4][1]/total)*100;
                    $("#pieDiscription").append("The graph shows the revision number distribution by user type, in which "+parseInt(total)+" number of users are taken into consideration for this analysis. From the pie chart, it is clear that the revisions were made mostly by regular users that cover for "+parseInt(d)+"%, followed by anonymous users with "+parseInt(a)+"%. The administrator users stands at "+parseInt(b)+"%, which is larger than  revisions made by bot users ("+parseInt(c+1)+"%).")
                });
            });
        });
    });

    $.get('/spa/getRevisionNames', null, function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#getRevisionNames").append("<option value='"+data[i]._id.title+"'>"+data[i]._id.title+" "+data[i].number+" of revisions</option>");
        }
    });
    
    $("#getRevision").click(function (e) {
    	 $("#updateRevision").empty();
        $("#updateRevision").append("Updating latest version of this revision");
    	$("#getRevisionNumber").empty();
    	$("#getRevisionNumber2").empty();
    	$("#getRevisionNumber1").empty();
    	$("#individualTitle").empty();
    	$("#getRevisionNumber").empty();
    	$("#getTopUser").empty(); 
    	$("#barChartIndividual").empty();
    	$("#pieChartIndividual").empty();
    	
        var parameters = {revisionName: $('#getRevisionNames').val()};
        $("#individualTitle").append(parameters.revisionName);

        
    	$.getJSON('/spa/getIndividualTitle', parameters, function (data) {
    		console.log(data);
    		var numRev = 0;
            $("#getRevisionNumber1").append("Last edited time of "+data.name+" in the database is: "+data.timestamp+".");        
            if(data.num == 0) {
            	$("#getRevisionNumber2").append("There is no avaible new revisions online.");
    		}else {
    			numRev += data.num;
                $("#getRevisionNumber2").append("Number of downloaded revision is: "+data.num+".");
    		}
            $("#updateRevision").empty();
            $("#updateRevision").append("Downloaded successfully.");
            
            $.get('/spa/getIndividualRevisionNumber', parameters, function (data) {
        		console.log(data);
                for (var i = 0; i < data.length; i++) {
                	numRev += data[i].numofrevisions;
                    $("#getRevisionNumber").append("Number of revision is: "+numRev+".");
                }
            });
            $.get('/spa/getIndividualRevisionTop', parameters, function (data) {
        		console.log(data);
                for (var i = 0; i < data.length; i++) {               	
                    $("#getTopUser").append((i+1)+". Author is: "+data[i]._id.user+", ");
                    $("#getTopUser").append("Number of revisions is: "+data[i].num+"<br>");
                }
            });
        });
    	
    	$.getJSON('/spa/getIndividualAnonsEachYear', parameters, function (data) {
            for (var i = 0;i<data.length;i++) {
            	var index = data[i]._id % 2000;
            	barchartIndividual[index][1] = parseInt(data[i].number);
            }
            
            $.getJSON('/spa/getIndividualAdminsEachYear', parameters, function (data) {
            	for (var i = 0;i<data.length;i++) {
                	var index = data[i]._id % 2000;
                	barchartIndividual[index][2] = parseInt(data[i].number);
                }
            	
            	$.getJSON('/spa/getIndividualBotsEachYear', parameters, function (data) {
                	for (var i = 0;i<data.length;i++) {
                    	var index = data[i]._id % 2000;
                    	barchartIndividual[index][3] = parseInt(data[i].number);
                    }
                	
                	$.getJSON('/spa/getIndividualRegsEachYear', parameters, function (data) {
                    	for (var i = 0;i<data.length;i++) {
                        	var index = data[i]._id % 2000;
                        	barchartIndividual[index][4] = parseInt(data[i].number);
                        }
                	    google.charts.setOnLoadCallback(drawIndividualBarChart);
                    });
                });
            });
        });
    	
    	$.getJSON('/spa/getIndividualTotalAnon', parameters, function (data) {
            for (var i = 0; i < data.length; i++) {
                piedataIndividual[1][1] = parseInt(data[i].count);
            }
            $.getJSON('/spa/getIndividualTotalAdmin', parameters, function (data) {
                for (var i = 0; i < data.length; i++) {
                    piedataIndividual[2][1] = parseInt(data[i].count);
                }
                $.getJSON('/spa/getIndividualTotalBot', parameters, function (data) {
                    for (var i = 0; i < data.length; i++) {
                        piedataIndividual[3][1] = parseInt(data[i].count);
                    }
                    $.getJSON('/spa/getIndividualTotalReg', parameters, function (data) {
                        for (var i = 0; i < data.length; i++) {
                            piedataIndividual[4][1] = parseInt(data[i].count);
                        }
                        google.charts.setOnLoadCallback(drawPieIndividual);
                    });
                });
            });
        });
    	
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
