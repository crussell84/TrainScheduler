$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBZSD7mFacLpbg91IZE_DvzhSXi7Q_lJvE",
        authDomain: "trainscheduler-95d4f.firebaseapp.com",
        databaseURL: "https://trainscheduler-95d4f.firebaseio.com",
        projectId: "trainscheduler-95d4f",
        storageBucket: "trainscheduler-95d4f.appspot.com",
        messagingSenderId: "159299685363"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var $submit = $("#submit");
    var $trainName = $("#trainName");
    var $destination = $("#destination");
    var $frequency = $("#frequency");
    var $firstTrain = $("#firstTrain");
    var $trainTable = $("#trainTable");

    function addTrain(name, destination, firstTrain, frequency){
        // console.log("Got here!");
        console.log(name+" "+ destination+" "+ firstTrain+" "+ frequency);
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
    }

    function calculateNextArrivalTime(firstTrain, frequency){
        var nextArrival = "10:00";
        var minutesAway = 10;
        var trainDetails = {nextArrival: nextArrival, minutesAway: minutesAway};

        return trainDetails;
    }

    database.ref().on("child_added", function(childSnapshot) {
      
        // Log everything that's coming out of snapshot
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;
        
        var nextTrainDetails = calculateNextArrivalTime(firstTrain, frequency);
        console.log(nextTrainDetails);
        
        // full list of items to the well
        var $newRow = $("<tr>");
        var $nameCell = $("<td>" + name + "</td>");
        var $destinationCell = $("<td>" + destination + "</td>");
        var $frequencyCell = $("<td>" + frequency + "</td>");
        var $nextArrivalCell = $("<td>" + nextTrainDetails.nextArrival + "</td>");
        var $minutesAwayCell = $("<td>" + nextTrainDetails.minutesAway + "</td>");

        // $nameCell.text(name);
        $newRow.append($nameCell, $destinationCell, $frequencyCell, $nextArrivalCell, $minutesAwayCell);
        $trainTable.append($newRow);
              
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

    $submit.on("click", function(){
        var destination = $destination.val();
        var trainName = $trainName.val().trim();
        var firstTrain = $firstTrain.val().trim();
        var frequency = $frequency.val().trim();
        addTrain(trainName, destination, firstTrain, frequency);
        document.getElementById("trainInfo").reset();
    });
    //end of doc.ready
});