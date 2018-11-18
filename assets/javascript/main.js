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


var dbname = "";
var dbdestination = "";
var dbfirstTime = "";
var dbfrequency = "";
var dbid = "";



var now = new Date() //moment().format();  






$('#submit').on('click', function(event){
    event.preventDefault();

    name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    id = destination + firstTime + frequency
    
 
    let hour = firstTime.slice(0,2)
    let minutes = firstTime.slice(2,4)
    
   
    var firstTimeDate = new Date(now.getFullYear(), now.getMonth() , now.getDate(), hour, minutes)


    var train = {
        'id':id,
        'train': name,
        'destination': destination,
        'first-time': firstTime,
        'frequency':frequency
    }

    db.ref('/trains/' + id).set(train)

    // console.log(train)
})
                    
db.ref('/trains').on('child_added', function(snap){

    dbname = snap.val().train;
    dbdestination = snap.val().destination;
    dbfirstTime = snap.val().firstTime;
    dbfrequency = snap.val().frequency;
    dbid = snap.val().id;
    let TTA = Math.floor((dbfrequency * 0.1))
    let ETA = moment().add(TTA,'m')._d
    formatETA = moment(ETA).format("HH:mm")
    console.log(formatETA)

    let $row = $('<tr>');
    $row.html('<td>' + dbname + '</td><td>' + dbdestination + '</td>' +
              '<td>' + dbfrequency + '</td><td>' + formatETA + '</td>' +
              '<td>' + TTA + '</td>');

    $('table').append($row)

})
