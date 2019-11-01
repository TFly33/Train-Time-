var firebaseConfig = {
    apiKey: "AIzaSyBHAktLZJvqv2rLiLmQljNL2fI7BTjGcNk",
    authDomain: "train-time-e74fc.firebaseapp.com",
    databaseURL: "https://train-time-e74fc.firebaseio.com",
    projectId: "train-time-e74fc",
    storageBucket: "train-time-e74fc.appspot.com",
    messagingSenderId: "416155884238",
    appId: "1:416155884238:web:2a6775ce7a9bb43c24ce9f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

var trainName; ""
var destination; ""
var firstTrainTime; ""
var frequency; ""

//   Initial variables

$("button").on("click", function (event) {
    
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    console.log(trainName);
    destination = $("#destination").val().trim();
    console.log(destination);
    firstTrainTime = $("#firstTrainTime").val().trim();
    console.log(firstTrainTime);
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.firstTrainTime);
    console.log(sv.frequency);

    // Let's add some momentjs input. 

    var firstTime = sv.firstTrainTime;
    var freq = sv.frequency;

    console.log (firstTime);
    console.log (freq);

    var newRow = $("<tr>");

    var trainNameTD = $("<td>");
    trainNameTD.text(sv.trainName);
    newRow.append(trainNameTD);

    var destinationTD = $("<td>");
    destinationTD.text(sv.destination);
    newRow.append(destinationTD);

    var frequencyTD = $("<td>");
    frequencyTD.text(sv.frequency);
    newRow.append(frequencyTD);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1,"years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    console.log("DIFFERENCE IN TIME" + diffTime);

    var tRemainder = diffTime % freq;
    console.log (tRemainder);

    var tMinutesTillTrain = freq - tRemainder;
    console.log ("Minutes Until Train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Next Train " + moment(nextTrain).format("HH:mm"));

    var firstTrainTimeFormat = moment(sv.firstTrainTime, "HH:mm");
    console.log(firstTrainTimeFormat);

    var firstTrainTimeTD = $("<td>");
    firstTrainTimeTD.text(sv.firstTrainTime);
    newRow.append(firstTrainTimeTD);

    var tMinutesTillTrainTD = $("<td>");
    tMinutesTillTrainTD.text(tMinutesTillTrain);
    newRow.append(tMinutesTillTrainTD);
    console.log (tMinutesTillTrainTD);

    
    $("tbody").append(newRow);

});

