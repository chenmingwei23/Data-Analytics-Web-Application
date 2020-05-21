$(document).ready(function(){
	$("#getNumber").click(function (e) {
		console.log("1231231");
        $("#getHighestRevid3").empty()//reset while click
        $("#getLowestRevid3").empty()
        $("#getHighestRevid").empty()
        $("#getLowestRevid").empty()

        var parameters = {inputNumber: $('#inputNumber').val()};
        if ($('#inputNumber').val()<0){ alert("This number must be positive!")}
        //get highest revisions from controllers, using 'parameters' to transfer the input value
        $.get('/spa/getHighestRevid', parameters, function (rdata) {

            for (var i = 0; i < rdata.length; i++) {
                $("#getHighestRevid").append("Title: " + rdata[i]._id + ", ")
                $("#getHighestRevid").append("Number Of Revisions: " + rdata[i].numOfRevid + "<br>")

            }
        });
        $.get('/spa/getLowestRevid', parameters, function (rdata) {

            for (var i = 0; i < rdata.length; i++) {
                $("#getLowestRevid").append("Title: " + rdata[i]._id + ", ")
                $("#getLowestRevid").append("Number Of Revisions: " + rdata[i].numOfRevid + "<br>")

            }
        });
        
    });
  
});
