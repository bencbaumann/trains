var snd = new Audio("assets/sounds/train.mp3"); // buffers automatically when created
snd.play();

$('#submit').on('click', function(e){
    e.preventDefault();
       var train = {};
       $('#trainform').serializeArray().map((x)=>{train[x.name] = x.value;}); 
       db.ref().push(train);
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
db.ref().on("child_added", function (childSnapshot) {
        $('tbody').append($('<tr>')
        .append(
            `<td>${childSnapshot.val().name}</td>
            <td>${childSnapshot.val().destination}</td>
            <td>${childSnapshot.val().frequency}</td>
            <td>${moment().add(childSnapshot.val().frequency - moment().diff(moment.unix(moment(childSnapshot.val().time, "HH:mm").format("X")), 'minutes') % childSnapshot.val().frequency, "m").format("hh:mm A")}</td>
            <td>${childSnapshot.val().frequency - moment().diff(moment.unix(moment(childSnapshot.val().time, "HH:mm").format("X")), 'minutes') % childSnapshot.val().frequency}</td>
            `
        ));
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
