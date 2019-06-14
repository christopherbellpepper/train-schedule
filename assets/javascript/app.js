// ### Bonus (Extra Challenges)
// * Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
// * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
// * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.

var config = {
  apiKey: "AIzaSyCNh8IeAA0fI-rwIfzxgzBJiHJIZW1P8Ps",
  authDomain: "train-scheduler-86554.firebaseapp.com",
  databaseURL: "https://train-scheduler-86554.firebaseio.com",
  projectId: "train-scheduler-86554",
  storageBucket: "train-scheduler-86554.appspot.com",
  messagingSenderId: "663017197560"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var name = "";
var destination = "";
var time = "";
var frequency = "";

// Click Button changes what is stored in firebase
$("#click-button").on("click", function(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  name = $("#name-input").val().trim();
  destination = $("#dest-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#freq-input").val().trim();

  // Change what is saved in firebase
  database.ref().set({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  });
});

// Firebase
// When changes occurs it will print them to console and html
database.ref().on("value", function(snapshot) {
  var nextTrain = getMinutesTilNextTrain(snapshot.val().time,snapshot.val().frequency);

  for (var i = 0; i < snapshot.val().trains; i++) {
    snapshot.val().trains[i].name;
    snapshot.val().trains[i].destination;
    snapshot.val().trains[i].time;
    snapshot.val().trains[i].frequency;
  }
  // append to our table of trains, inside tbody, with a new row of the train data
  $("#train-display").append(
    "<tr><th>" + snapshot.val().name +  "</th>" + 
    "<td>" + snapshot.val().destination + "</td>" + 
    "<td>" + snapshot.val().time + "</td>" + 
    "<td>" + snapshot.val().frequency + "</td>" + 
    "<td>" + nextTrain + "</td>"
  );

  // Clear the textbox when done
  $(".form-control").val("");
});

function getMinutesTilNextTrain(firstTrain, frequency) {
  var firstTrainOfTheDay = moment(firstTrain, "HH:mm");

  // Get the current time
  var currentTime = moment();

  // Create a variable to store the next train time
  var minutesTilNextTrain = 0;

  // If the first time is in the future, set next train to then
  if (firstTrainOfTheDay > currentTime) {
    minutesTilNextTrain = firstTrainOfTheDay.diff(currentTime, "minutes");
  } else {
    // Otherwise, get minutes past first time
    var minutesPast = currentTime.diff(firstTrainOfTheDay, "minutes");
    // Find the result of minutesPast % frequency
    var remainder = minutesPast % frequency;
    // Subtract the remainder from the frequency
    minutesTilNextTrain = frequency - remainder;
  }

  return minutesTilNextTrain;
}
