// ### Instructions

  // * Make sure that your app suits this basic spec:
  //   * When adding trains, administrators should be able to submit the following:
  //     * Train Name
  //     * Destination 
  //     * First Train Time -- in military time
  //     * Frequency -- in minutes
  //   * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  //   * Users from many different machines must be able to view same train times.
  //   * Styling and theme are completely up to you. Get Creative!

// ### Bonus (Extra Challenges)
  // * Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
  // * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
  // * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.

var config =  {
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

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().time);
      console.log(snapshot.val().frequency);

      // Add to the HTML table
      $("#name-display").text(snapshot.val().name);
      $("#dest-display").text(snapshot.val().destination);
      $("#time-display").text(snapshot.val().time);
      $("#freq-display").text(snapshot.val().frequency);



    //   $("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().destination + " | " + snapshot.val().time + " | " + snapshot.val().frequency);

      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });