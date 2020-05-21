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
	$("#getNumber").click(function (e) {
        $("#getHighestRevid3").empty()
        $("#getLowestRevid3").empty()
        $("#getHighestRevid").empty()
        $("#getLowestRevid").empty()
        $("#getLargestGroup").empty()
        $("#getSmallestGroup").empty()
        $("#getLargestGroup2").empty()
        $("#getSmallestGroup2").empty()



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
        
    });
  
});
