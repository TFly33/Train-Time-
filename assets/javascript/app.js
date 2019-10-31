var firebaseConfig = {
    apiKey: "AIzaSyDGypxWbzf31-dq0pZxxl0a5_8ks8u6NzE",
    authDomain: "flynn-3c469.firebaseapp.com",
    databaseURL: "https://flynn-3c469.firebaseio.com",
    projectId: "flynn-3c469",
    storageBucket: "flynn-3c469.appspot.com",
    messagingSenderId: "434762039386",
    appId: "1:434762039386:web:144f544005890d380ed863"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

var TrainName; ""
var destination; ""
var firstTrainTime; ""
var frequency; ""

//   Initial variables

$("Button").on("click", function (event) {
    event.preventDefault();

    TrainName = $("#TrainName").val().trim();
    console.log(TrainName);
    Destination = $("#Destination").val().trim();
    console.log(destination);
    firstTrainTime = $("#firstTrainTime").val().trim();
    console.log(firstTrainTime);
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        TrainName: TrainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

});

database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.TrainName);
    console.log(sv.destination);
    console.log(sv.firstTrainTime);
    console.log(sv.frequency);

    var newRow = $("<tr>");

    var nameTD = $("<td>");
    nameTD.text(sv.TrainName);
    newRow.append(nameTD);

    var destinationTD = $("<td>");
    destinationTD.text(sv.destination);
    newRow.append(destinationTD);

    var firstTrainTimeTD = $("<td>");
    firstTrainTimeTD.text(sv.firstTrainTime);
    newRow.append(firstTrainTimeTD);

    var monthlyFormat = "YYYY-MM-DD";
    var convertedDate = moment(sv.firstTrainTime, monthlyFormat);

    // console.log(convertedDate.format("MM/DD"));
    console.log(convertedDate.diff(moment(), "months"));

    var monthsWorkedTD = $("<td>");
    monthsWorkedTD.text(moment().diff(convertedDate, "months"));
    newRow.append(monthsWorkedTD);

    var frequencyTD = $("<td>");
    frequencyTD.text(sv.frequency);
    newRow.append(frequencyTD);

    var mW = (moment().diff(convertedDate, "months"))
    var empBilled = (mW * frequency);

    var empBilledTD = $("<td>");
    empBilledTD.text(empBilled);
    newRow.append(empBilledTD);

    $("tbody").append(newRow);

});

