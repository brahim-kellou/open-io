const { Board, Pin } = require("johnny-five");

url = 'http://192.168.78.78/api'

// var board = new Board();

var board = new Board({
    repl: false,
});


board.on("ready", function () {
    //read from A0
    var pin = new Pin("A0");
    var presence = true;

    // Envoi d'un message vers le serveur.
    pin.read(function (error, value) {
        if (value < 500 && !presence) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(resp => resp.json())
                .then(resp => console.log(resp))

            presence = true;
        } else if (value >= 500) {
            presence = false;
        }
    });
});
