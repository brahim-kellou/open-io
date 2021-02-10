const {PROD_API_ENDPOINT, DEV_API_ENDPOINT} = require("./config")
const { Board, Pin } = require("johnny-five");
const fetch = require('node-fetch');
const apiPath = "/api/persons/detection/"
const apiUrl = PROD_API_ENDPOINT + apiPath


var board = new Board({
    repl: false,
    port : "COM7"
});


board.on("ready", function () {
   // read from A0
    var pin = new Pin({
        pin :"A0",
        board: board
    });
    var presence = false;

    // Envoi d'un message vers le serveur.
    pin.read(function (error, value) {
        if (value < 400 && !presence) {
            presence = true;
        } else if (value >= 400 && presence) {
            console.log("person detected")
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(resp => resp.json())
                .then(resp => console.log(resp))

            presence = false;
        }
    });
});
