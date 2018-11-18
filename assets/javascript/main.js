var config = {
    apiKey: "AIzaSyAUlphtw8Pvqjge2KdfyPK98fT9dIBnfH8",
    authDomain: "train-schedule-e0b6f.firebaseapp.com",
    databaseURL: "https://train-schedule-e0b6f.firebaseio.com",
    projectId: "train-schedule-e0b6f",
    storageBucket: "train-schedule-e0b6f.appspot.com",
    messagingSenderId: "496969695046"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
  var trains = db.ref("/train");

var name = "";
var destination = "";
var firstTime = "";
var frequency = "";
var ETA = "";

var dbname = "";
var dbdestination = "";
var dbfirstTime = "";
var dbfrequency = "";
var dbid = "";

// var minutes;
// var hour;
// var period;

var x = moment(moment().format('LTS'))._i;  


$('#submit').on('click', function(event){
    event.preventDefault();

    name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    id = destination + firstTime + frequency
    
    
    // hour = firstTime.slice(0,2)
    // minutes = firstTime.slice(3,5)
    // period = firstTime.slice(6,8)




    console.log(time)

   
    var train = {
        'id':id,
        'train': name,
        'destination': destination,
        'first-time': firstTime,
        'frequency':frequency
    }

    db.ref('/trains/' + id).set(train)
    console.log(train)
})
                    
db.ref('/trains').on('child_added', function(snap){

    dbname = snap.val().train;
    dbdestination = snap.val().destination;
    dbfirstTime = snap.val().firstTime;
    dbfrequency = snap.val().frequency;
    dbid = snap.val().id;
    ETA = Math.floor((dbfrequency * 0.9))

    let minutes = dbfirstTime


    let $row = $('<tr>');
    $row.html('<td>' + dbname + '</td><td>' + dbdestination + '</td>' +
              '<td>' + dbfrequency + '</td><td>' + dbfirstTime + '</td>' +
              '<td>' + ETA + '</td>');

    $('table').append($row)

})